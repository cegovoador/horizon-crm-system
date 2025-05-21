
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  DollarSign,
  Package,
  Settings,
  LogOut,
  User
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/dashboard",
      allowedRoles: ["admin", "finance", "inventory"],
    },
    {
      name: "Financeiro",
      icon: <DollarSign className="h-5 w-5" />,
      path: "/finance",
      allowedRoles: ["admin", "finance"],
    },
    {
      name: "Estoque",
      icon: <Package className="h-5 w-5" />,
      path: "/inventory",
      allowedRoles: ["admin", "inventory"],
    },
    {
      name: "Configurações",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
      allowedRoles: ["admin"],
    },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.allowedRoles.includes(currentUser?.role || '')
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out",
          !sidebarOpen && "w-20"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <div className={cn("flex items-center", !sidebarOpen && "justify-center w-full")}>
            <span className={cn("font-bold text-crm-primary text-2xl", !sidebarOpen && "hidden")}>CRM</span>
            {!sidebarOpen && <span className="font-bold text-crm-primary text-2xl">C</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-8 w-8"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto py-4">
          <nav className="flex-1 space-y-1 px-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  location.pathname === item.path
                    ? "bg-crm-primary text-white"
                    : "text-gray-700 hover:bg-crm-gray-light"
                )}
              >
                {item.icon}
                <span className={cn("ml-3", !sidebarOpen && "hidden")}>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5 text-crm-primary" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{currentUser?.name}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm text-gray-500">
                    {currentUser?.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{currentUser?.name}</p>
                <p className="text-xs text-gray-500">{currentUser?.role === 'admin' ? 'Administrador' : currentUser?.role === 'finance' ? 'Financeiro' : 'Estoque'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={cn(
          "flex-1 transition-all duration-300 ease-in-out",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <main className="h-full overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
