import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { WebsiteSettingsForm } from "./_components/website-settings-form";
import PageContainer from "@/app/(protected)/_components/page-container";

export default function SettingsPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <Heading
          title="Settings"
          description="Manage your account and website settings"
        />
        <Separator />
        <WebsiteSettingsForm />
      </div>
    </PageContainer>
  );
}
