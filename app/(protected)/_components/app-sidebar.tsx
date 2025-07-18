"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { navItems } from "@/components/constants/data";
import { Icons } from "@/components/icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Bell,
  ChevronRight,
  ChevronsUpDown,
  CircleUserRound,
  GalleryVerticalEnd,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutButton } from "@/components/auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";

export function AppSidebar() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [filteredItems, setFilteredItems] = useState(navItems);

  const company = {
    name: "Office Desk",
    logo: GalleryVerticalEnd,
    plan: user?.role,
  };

  useEffect(() => {
    if (status === "authenticated" && user) {
      const filtered = navItems.filter((item) => {
        if (!item.allowedRoles) return true;
        return user.role && item.allowedRoles.includes(user.role);
      });
      setFilteredItems(filtered);
    }
  }, [user, status]);

  if (status === "loading") {
    return null;
  }

  const sidebarLinks = [
    ...filteredItems.map((item) => {
      const Icon = item.icon ? Icons[item.icon] : Icons.logo;
      const isActive = item.items
        ? item.items.some((subItem) => pathname === subItem.url)
        : pathname === item.url;

      return item?.items && item?.items?.length > 0 ? (
        <Collapsible
          key={item.title}
          asChild
          defaultOpen={isActive}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.disabled ? "Coming Soon" : item.title}
                isActive={pathname === item.url}
                className={item.disabled ? "opacity-50 cursor-not-allowed" : ""}
              >
                {item.icon && <Icon />}
                <span>{item.title}</span>
                {item.disabled && (
                  <div className="ml-auto flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4 animate-pulse" />
                  </div>
                )}
                {!item.disabled && (
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                )}
              </SidebarMenuButton>
            </CollapsibleTrigger>
            {!item.disabled && (
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild={!subItem.disabled}
                        isActive={pathname === subItem.url}
                        className={
                          subItem.disabled
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                      >
                        {subItem.disabled ? (
                          <div
                            className="flex justify-between w-full items-center"
                            title="This feature is coming soon"
                          >
                            <span>{subItem.title}</span>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                              <Clock className="h-4 w-4 animate-pulse" />
                            </div>
                          </div>
                        ) : (
                          <Link href={subItem.url || "/"}>
                            <span>{subItem.title}</span>
                          </Link>
                        )}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            )}
          </SidebarMenuItem>
        </Collapsible>
      ) : (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            tooltip={item.title}
            isActive={pathname === item.url}
          >
            <Link href={item.url || "/"}>
              <Icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }),
  ];

  return ( 
    <Sidebar collapsible="icon" className="z-50">
      <SidebarHeader>
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <company.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{company.name}</span>
            <span className="truncate text-xs capitalize">
              {company.plan?.toLowerCase()}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>{sidebarLinks}</SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.image as string}
                      alt={user?.name as string}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.name?.slice(0, 2)?.toUpperCase() || "CN"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name || ""}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email || ""}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || ""}
                      />
                      <AvatarFallback className="rounded-lg font-bold">
                        {user?.name?.slice(0, 2)?.toUpperCase() || "CN"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name || ""}
                      </span>
                      <span className="truncate text-xs">
                        {" "}
                        {user?.email || ""}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href={"/dashboard"} className="flex flex-row gap-2">
                      <Bell />
                      Notifications
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={"/dashboard/settings/profile"}
                      className="flex flex-row gap-2"
                    >
                      <CircleUserRound />
                      Account
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <LogoutButton>
                    <div className="flex items-center gap-2">
                      <ExitIcon className="h-5 w-5" />
                      Logout
                    </div>
                  </LogoutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
