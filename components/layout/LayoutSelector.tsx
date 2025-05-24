"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface LayoutSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const layouts = [
  {
    value: "classic",
    label: "Classic",
    description: "Traditional news layout with a clean design",
    image: "/images/layouts/classic.svg",
  },
  {
    value: "modern",
    label: "Modern",
    description: "Contemporary design with enhanced visuals",
    image: "/images/layouts/modern.svg",
  },
  {
    value: "minimal",
    label: "Minimal",
    description: "Simple and focused content presentation",
    image: "/images/layouts/minimal.svg",
  },
];

export default function LayoutSelector({
  value,
  onValueChange,
}: LayoutSelectorProps) {
  return (
    <RadioGroup
      defaultValue={value}
      onValueChange={onValueChange}
      className="grid grid-cols-3 gap-4"
    >
      {layouts.map((layout) => (
        <div key={layout.value}>
          <RadioGroupItem
            value={layout.value}
            id={layout.value}
            className="peer sr-only"
          />
          <Label
            htmlFor={layout.value}
            className="flex flex-col gap-2 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              <Image
                src={layout.image}
                alt={layout.label}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{layout.label}</span>
              <span className="text-sm text-muted-foreground">
                {layout.description}
              </span>
            </div>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
