import {
  Home,
  ShoppingCart,
  PackageSearch,
  History,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

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
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("template-app-token");
    navigate("/login", { replace: true });
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-bgu">
        <SidebarGroup className="bg-bgu">
          <SidebarGroupLabel className="montserrat text-xl pt-5 pb-7 text-txt">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent className="bg-bgu">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.title === "Logout" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <SidebarMenuButton className="hover:bg-black active:bg-black">
                          <span className="!text-pri montserrat flex items-center cursor-pointer">
                            <item.icon />
                            <span className="text-txt">{item.title}</span>
                          </span>
                        </SidebarMenuButton>
                      </DialogTrigger>
                      <DialogContent className="bg-bgu">
                        <DialogHeader>
                          <DialogTitle className="text-txt montserrat text-2xl">Confirm Logout</DialogTitle>
                        </DialogHeader>
                        <div className="crimson-pro text-lg text-gray-400">Are you sure you want to logout?</div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button className="w-23 bg-black montserrat text-xs font-semibold text-pri border-2 border-pri hover:bg-pri hover:text-black transition-colors duration-300">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            className="w-23 bg-black montserrat text-xs font-semibold text-pri border-2 border-pri hover:bg-pri hover:text-black transition-colors duration-300"
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <SidebarMenuButton
                      className="hover:bg-black active:bg-black"
                      asChild
                    >
                      <Link className="!text-pri montserrat" to={item.url}>
                        <item.icon />
                        <span className="text-txt">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
