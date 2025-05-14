import axiosInstance from "@/constants/axios";
import { NotificationListResponse, PaginationParams } from "@/constants/config";

export const fetchNotification = async (
  pagination?: PaginationParams,
  searchTerm?: string
): Promise<NotificationListResponse> => {
  try {
    const params = {
      searchTerm: searchTerm ?? "",
      ...(pagination || {}),
    };

    const response = await axiosInstance.get<NotificationListResponse>(
      "/api/v1/Order/notification-list",
      {
        params,
      }
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Notification List:", error);
    throw error;
  }
};
