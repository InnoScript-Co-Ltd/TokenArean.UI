// General
export interface PaginationParams {
  page?: number;
  perPage?: number;
}
// General

// Login
export interface LoginResponse {
  message: string;
  accessToken: string;
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

// Game
export interface Game {
  id: string;
  title: string;
  description: string;
  logo: string;
  bannerImage: string;
  orderIndex: number;
  serverType: string;
  isDisable: boolean;
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
