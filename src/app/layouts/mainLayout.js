"use client"
import { usePathname } from 'next/navigation';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function MainLayout({ children }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        {pathname !== '/top' &&
         <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>}
        {pathname == '/top' &&
          <main>
            {children}
          </main>}
      </body>
    </html>
  );
}
