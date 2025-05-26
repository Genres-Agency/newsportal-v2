"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getWebsiteSettings } from "@/actions/auth/website-settings";

interface StyleProviderProps {
  children: React.ReactNode;
}

export function StyleProvider({ children }: StyleProviderProps) {
  const { data: session } = useSession();

  useEffect(() => {
    const updateStyles = async () => {
      if (session?.user?.id) {
        const { settings, error } = await getWebsiteSettings();

        if (settings) {
          document.documentElement.style.setProperty(
            "--primary-color",
            settings.primaryColor
          );
          document.documentElement.style.setProperty(
            "--primary-foreground-color",
            settings.primaryForegroundColor
          );
          document.documentElement.style.setProperty(
            "--secondary-color",
            settings.secondaryColor
          );
          document.documentElement.style.setProperty(
            "--secondary-foreground-color",
            settings.secondaryForegroundColor
          );
        }
      }
    };

    updateStyles();
  }, [session]);

  return <>{children}</>;
}
