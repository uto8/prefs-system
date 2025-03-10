"use server"

import ApiGet from "@/lib/useApi/get";

export const getNotifications = async ()=> {
  const notifications = await ApiGet("/notifications")
  return notifications
}
