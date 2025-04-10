// General
export interface PaginationParams {
  currentPage?: number;
  pageSize?: number;
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
  title: string;
  description: string;
  logo: string;
  bannerImage: string;
  orderIndex: number;
  serverType: string;
  isDisable: boolean;
  createdAt: Date;
}

export interface GameListResponse {
  statusCode: number;
  message: string;
  payLoad: {
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: number | null;
      nextPage: number | null;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
    items: Game[];
  };
  payLoadList: null;
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

// TokenPackage
export interface TokenPackage {
  id: string;
  tokenTitle: string;
  packageImage: string;
  unit: string;
  price: string;
  currency: number;
  createdDate: Date;
  gameDto: Game;
}

export interface TokenPackageListResponse {
  statusCode: number;
  message: string;
  payLoad: {
    paging: {
      totalCount: number;
      totalPages: number;
      previousPage: number | null;
      nextPage: number | null;
      firstRowOnPage: number;
      lastRowOnPage: number;
    };
    items: TokenPackage[];
  };
  payLoadList: null;
}

// Create payload — omit id, timestamps
export interface TokenPackagePayload {
  title: string;
  genre: string;
  platform: string;
}
export interface DeleteTokenPackageResponse {
  id: string;
}
// Game
