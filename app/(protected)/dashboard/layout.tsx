import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import Header from "../_components/header";
import KBar from "@/components/kbar";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  return (
    <KBar>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar user={user} />
        <SidebarInset className="overflow-x-hidden">
          <Header />
          <div className="overflow-x-hidden">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
};

export default ProtectedLayout;
