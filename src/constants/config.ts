// Login
export interface LoginResponse {
  message: string;
  data: {
    access_token: string;
  };
}
export interface LoginPayload {
  email: string;
  password: string;
}
// Login

// Logout
export interface LogoutResponse {
  message: string;
}
// Logout
