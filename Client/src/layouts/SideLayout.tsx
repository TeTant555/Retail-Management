import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/appSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger className="text-pri z-50 bg-bgu hover:bg-bgu fixed hover:text-pri" />
        {children}
      </main>
    </SidebarProvider>
  )
}