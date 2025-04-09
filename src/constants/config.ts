// General
export interface PaginationParams {
  page?: number;
  perPage?: number;
}
// General

// Login
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
export interface LoginPayload {
  email: string;
  password: string;
}
// Login

// Login
export interface RefreshTokenResponse {
  accessToken: string;
}
export interface RefreshTokenPayload {
  refreshToken: string;
}
// Login

// Logout
export interface LogoutResponse {
  message: string;
}
// Logout

// Game
export interface Game {
  id: string;
  Title: string;
  Description: string;
  Logo: string;
  BannerImage: string;
  OrderIndex: number;
  ServerType: string;
  IsDisable: boolean;
}

export interface GameListResponse {
  data: Game[];
  total: number;
  page: number;
  limit: number;
}

// Create payload — omit id, timestamps
export interface GamePayload {
  title: string;
  genre: string;
  platform: string;
}
export interface DeleteGameResponse {
  id: string;
}
// Game
