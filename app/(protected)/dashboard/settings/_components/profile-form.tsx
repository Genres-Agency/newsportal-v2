"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";
import { MediaSelectorModal } from "../../media/_components/MediaSelectorModal";

export function ProfileForm() {
  const user = useCurrentUser();
  const [showMediaSelector, setShowMediaSelector] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-x-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>
              {user?.name?.charAt(0) || user?.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" onClick={() => setShowMediaSelector(true)}>
            Change avatar
          </Button>
        </div>
      </CardContent>
      <MediaSelectorModal
        open={showMediaSelector}
        onOpenChange={setShowMediaSelector}
        onMediaSelect={(id, url) => {
          // Handle avatar update
        }}
        onFileSelect={() => {}}
        allowedTypes={["upload"]}
        showLibrary={false}
      />
    </Card>
  );
}
