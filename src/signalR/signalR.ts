import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

const HUB_URL = "http://localhost:5132/api/v1/Order/notification-list";

let connection: HubConnection | null = null;

/**
 * Creates (or returns existing) HubConnection.
 */
export const createSignalRConnection = (token?: string): HubConnection => {
  if (connection) {
    return connection;
  }

  connection = new HubConnectionBuilder()
    .withUrl(HUB_URL, {
      accessTokenFactory: () => token ?? "",
      withCredentials: true,
    })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

  return connection;
};

/**
 * Starts the connection if it’s not already running.
 */
export const startConnection = async (
  token?: string
): Promise<HubConnection> => {
  const conn = createSignalRConnection(token);

  if (conn.state === "Disconnected") {
    try {
      await conn.start();
      console.log("SignalR connected.");
    } catch (err) {
      console.error("SignalR connection failed:", err);
      throw err;
    }
  }

  return conn;
};

/**
 * Stops and clears the connection.
 */
export const stopConnection = async (): Promise<void> => {
  if (connection && connection.state !== "Disconnected") {
    await connection.stop();
    console.log("SignalR disconnected.");
    connection = null;
  }
};

/**
 * A single default export for easy import.
 */
const signalRService = {
  createSignalRConnection,
  startConnection,
  stopConnection,
};

export default signalRService;
