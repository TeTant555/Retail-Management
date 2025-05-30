import { Home, ShoppingCart, PackageSearch, History, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom" 

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
import Cookies from "js-cookie";

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
  {
    title: "Logout",
    url: "/login",
    icon: LogOut,
  }
]

export function AppSidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("template-app-token");
    navigate("/login", { replace: true });
  }

  return (
    <Sidebar>
      <SidebarContent className="bg-bgu">
        <SidebarGroup className="bg-bgu">
          <SidebarGroupLabel className="montserrat text-txt text-md">Menu</SidebarGroupLabel>
          <SidebarGroupContent className="bg-bgu">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="hover:bg-black active:bg-black"
                  asChild={item.title !== "Logout"}
                  onClick={item.title === "Logout" ? handleLogout : undefined}>
                  {item.title === "Logout" ? (
                    <span className="!text-pri montserrat flex items-center gap-2 cursor-pointer">
                        <item.icon />
                        <span className="text-txt">{item.title}</span>
                      </span>
                    ) : (
                      <Link className="!text-pri montserrat" to={item.url}>
                        <item.icon />
                        <span className="text-txt">{item.title}</span>
                      </Link>
                    )}
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