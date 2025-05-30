import * as React from "react";
import { GalleryVerticalEnd, Gamepad } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { Link } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    user: {
      name: "User",
      email: "user@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "User",
        url: "users",
        icon: Gamepad,
        isActive: true,
        items: [
          {
            title: "Users List",
            url: "/dashboard/users",
          },
        ],
      },
      {
        title: "Game",
        url: "games",
        icon: Gamepad,
        isActive: true,
        items: [
          {
            title: "Game List",
            url: "/dashboard/games",
          },
        ],
      },
      {
        title: "TokenPackage",
        url: "packages",
        icon: Gamepad,
        isActive: true,
        items: [
          {
            title: "TokenPackage List",
            url: "/dashboard/packages",
          },
        ],
      },
      {
        title: "Order",
        url: "orders",
        icon: Gamepad,
        isActive: true,
        items: [
          {
            title: "Order List",
            url: "/dashboard/orders",
          },
        ],
      },
      {
        title: "ConfigSetting",
        url: "configsetting",
        icon: Gamepad,
        isActive: true,
        items: [
          {
            title: "ConfigSetting List",
            url: "/dashboard/configsetting",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">LoRi Gaming Store</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
