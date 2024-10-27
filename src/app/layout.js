import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import MainLayout from './layouts/mainLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
        {children}
        </MainLayout>
      </body>
    </html>
  );
}
