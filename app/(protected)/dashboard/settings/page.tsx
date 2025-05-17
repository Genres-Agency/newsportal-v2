import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { WebsiteSettingsForm } from "./_components/website-settings-form";
import { SettingsForm } from "./_components/settings-form";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Heading
        title="Settings"
        description="Manage your account and website settings"
      />

      <div className="space-y-6">
        <WebsiteSettingsForm />
      </div>
    </div>
  );
}
