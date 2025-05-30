// General
export interface PaginationParams {
  currentPage?: number;
  pageSize?: number;
}
// General

// Login
export interface LoginResponse {
  payLoad: {
    accessToken: string;
    refreshToken: string;
  };
}
export interface LoginPayload {
  email: string;
  password: string;
}
// Login

// Refresh Token
export interface RefreshTokenResponse {
  payLoad: {
    accessToken: string;
    refreshToken: string;
  };
}
export interface RefreshTokenPayload {
  refreshToken: string;
}
// Refresh Token

// Forget Password
export interface ForgetPasswordResponse {
  message: string;
}
export interface ForgetPasswordPayload {
  email: string;
}
// Forget Password

// Change Password
export interface ChangePasswordResponse {
  message: string;
}
export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
// Change Password

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
  gameProfileImage: string;
  orderIndex: number;
  serverType: string;
  isDisable: boolean;
  file_Logo: File;
  file_BannerImage: File;
  tokenPackageDto: TokenPackage[] | null;
  createdAt: Date;
  configSettingDtos: ConfigSetting[] | null | undefined;
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
  payLoadList: Game[];
}
export interface GamePayload {
  title: string;
  description: string;
  logo: string | null;
  gameProfileImage: string | null;
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
  paymentMethod: string;
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
export interface TokenPackageEntryResponse {
  statusCode: number;
  message: string;
  payLoad: TokenPackage;
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
  paymentMethod: string;
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
  userDto: User;
  gameTitle: string;
  isRead: boolean;
}
export interface CleanOrderRequest {
  type: "WEEKLY" | "MONTHLY";
  count: number;
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
export interface OrderEntryResponse {
  statusCode: number;
  message: string;
  payLoad: Order;
  payLoadList: null;
}

// Create payload — omit id, timestamps
export interface OrderPayload {
  inGameUserId: number | string;
  serverInfo?: string;
  screenShot?: string | File | null;
  file_ScreenShot?: File | null;
  mobileNumber?: string;
  orderStatus?: string;
  tokenPackageId: number | string;
}
export interface DeleteOrderResponse {
  id: string;
}
export interface OrderDetailResponse {
  message: string;
  payLoad: Order;
  payLoadList: null;
  statusCode: number;
}
// Order

//Notification
export interface Notification {
  orderId: string;
  message: string;
  isRead: boolean;
}

export interface NotificationListResponse {
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
    items: Notification[];
  };
  payLoadList: null;
}

//Notification
// User
export interface User {
  id: string;
  email: string;
  emailConfirmed: boolean;
}

export interface UserListResponse {
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
    items: User[];
  };
  payLoadList: null;
}

export interface UserEntryResponse {
  statusCode: number;
  message: string;
  payLoad: User;
  payLoadList: null;
}

// Create payload — omit id, timestamps
export interface UserPayload {
  email: string;
  password: string;
}
export interface DeleteUserResponse {
  id: string;
}
// User

// ConfigSetting
export interface ConfigSetting {
  id: number;
  logo: string;
  paymentName: string;
  phone: string;
  orderIndex: number;
  file_Logo?: File | null;
}

export interface ConfigSettingListResponse {
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
    items: ConfigSetting[];
  };
  payLoadList: null;
}

export interface ConfigSettingEntryResponse {
  statusCode: number;
  message: string;
  payLoad: ConfigSetting;
  payLoadList: null;
}

// Create payload — omit id, timestamps
export interface ConfigSettingPayload {
  paymentName: string;
  phone: string;
  logo: string | null;
  file_Logo?: File | null;

  orderIndex: number;
}
export interface DeleteConfigSettingResponse {
  id: number;
}
// ConfigSetting
