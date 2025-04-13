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
  file_Logo: File;
  file_BannerImage: File;
  tokenPackageDto: TokenPackage[] | null;
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

export interface GameDetailResponse {
  message: string;
  payLoad: Game;
  payLoadList: null;
  statusCode: number;
}
export interface GameEntryResponse {
  statusCode: number;
  message: string;
  payLoad: Game;
  payLoadList: null;
}
export interface GamePayload {
  title: string;
  description: string;
  logo: string | null;
  bannerImage: string | null;
  file_Logo?: File | null;
  file_BannerImage?: File | null;
  orderIndex: number;
  serverType: string;
  isDisable: boolean;
}

// Game

// TokenPackage
export interface TokenPackage {
  id: string;
  tokenTitle: string;
  packageImage: string;
  unit: number;
  price: number;
  currency: string;
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
  tokenTitle: string;
  packageImage: string;
  unit: number;
  file_PackageImage: File;
  price: number;
  currency: string;
  gameId: number;
}
export interface DeleteTokenPackageResponse {
  id: string;
}
// TokenPackage

// Order
export interface Order {
  id: string;
  inGameUserId: number;
  tokenPackageDto: TokenPackage;
  serverInfo: string;
  mobileNumber: string;
  screenShot: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  operatorBy: Game;
}

export interface OrderListResponse {
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
    items: Order[];
  };
  payLoadList: null;
}

// Create payload — omit id, timestamps
export interface OrderPayload {
  inGameUserId: number | string;
  serverInfo?: string;
  screenShot?: string | null;
  file_ScreenShot?: File | null;
  mobileNumber?: string;
  orderStatus?: string;
  tokenPackageId: number | string;
}
export interface DeleteOrderResponse {
  id: string;
}
// Order
