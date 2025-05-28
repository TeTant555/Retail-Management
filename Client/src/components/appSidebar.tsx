import { Home, ShoppingCart, PackageSearch, History } from "lucide-react"
import { Link } from "react-router-dom" 

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "/product",
    icon: PackageSearch,
  },
  {
    title: "Cart",
    url: "/cart",
    icon: ShoppingCart,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-bgu">
        <SidebarGroup className="bg-bgu">
          <SidebarGroupLabel className="montserrat text-txt text-md">Menu</SidebarGroupLabel>
          <SidebarGroupContent className="bg-bgu">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="hover:bg-black active:bg-black" asChild>
                    <Link className="!text-pri montserrat" to={item.url}>
                      <item.icon />
                      <span className="text-txt">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}