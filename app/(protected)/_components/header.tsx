import { Breadcrumbs } from "@/components/breadcrumbs";
import SearchInput from "@/components/search-input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { UserNav } from "./user-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <SearchInput />
          </div>
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
