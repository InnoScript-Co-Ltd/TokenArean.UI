import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/AppSideBar";

const DashboardLayout: React.FC = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex items-center gap-2 px-4 h-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 transition-[width,height] ease-linear ">
            <SidebarTrigger />
            <h1 className=" font-semibold">Zip P Panel</h1>
          </header>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;
