import environment from "@/constants/environment";
import {
  HubConnection,
  HubConnectionBuilder,
  HttpTransportType,
  LogLevel,
} from "@microsoft/signalr";

class SignalRService {
  private connection: HubConnection | null = null;

  /**
   * Builds & starts connection (once), logs every step.
   */
  public async startConnection(token?: string): Promise<void> {
    if (!this.connection) {
      this.connection = new HubConnectionBuilder()
        .withUrl(environment.SignalR_URL, {
          accessTokenFactory: () => token ?? "",
          transport:
            HttpTransportType.WebSockets | HttpTransportType.LongPolling,
          withCredentials: true,
        })
        .configureLogging(LogLevel.Trace)
        .withAutomaticReconnect([0, 2000, 5000, 10000])
        .build();

      this.connection.onclose((error?: Error) => {
        console.warn("SignalR ▶ connection closed.", error);
      });
      this.connection.onreconnecting((error?: Error) => {
        console.warn("SignalR ▶ reconnecting...", error);
      });
      this.connection.onreconnected((connectionId?: string) => {
        console.log("SignalR ▶ reconnected, connectionId =", connectionId);
      });
    }

    if (this.connection.state === "Disconnected") {
      try {
        console.log("SignalR ▶ Starting connection...");
        await this.connection.start();
        console.log("SignalR ▶ Connected!");
      } catch (error) {
        console.error("SignalR ▶ Start failed:", error);
        // Retry once after a pause
        await new Promise((r) => setTimeout(r, 3000));
        return this.startConnection(token);
      }
    }

    // Wait until fully connected
    while (this.connection.state !== "Connected") {
      console.log("SignalR ▶ waiting for Connected state...");
      // small backoff to avoid tight loop
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  /**
   * Invoke a hub method. Ensures the connection is Connected first.
   * T is the return type you expect from the hub method.
   */
  public async invokeMethod<T = void>(
    methodName: string,
    ...args: unknown[]
  ): Promise<T> {
    if (!this.connection) {
      throw new Error("SignalR connection not initialized.");
    }
    if (this.connection.state !== "Connected") {
      await this.startConnection();
    }
    return this.connection.invoke<T>(methodName, ...args);
  }

  /**
   * Register a callback for an incoming hub message.
   * Payload parameters will be passed as unknown—you can cast them in your callback.
   */
  public onReceive(
    methodName: string,
    callback: (...args: unknown[]) => void
  ): void {
    if (!this.connection) {
      throw new Error("SignalR connection not initialized.");
    }
    this.connection.on(methodName, callback);
    console.log(`SignalR ▶ Listening for '${methodName}'`);
  }

  /**
   * Stops and tears down the connection.
   */
  public async stopConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      console.log("SignalR ▶ Stopped connection");
      this.connection = null;
    }
  }
}

export default new SignalRService();
