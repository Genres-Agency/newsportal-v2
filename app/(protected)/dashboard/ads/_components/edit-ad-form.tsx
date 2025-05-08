"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AdVariant, Advertisement } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { MediaSelectorModal } from "../../media/_components/MediaSelectorModal";
import { Upload } from "lucide-react";
import Image from "next/image";
import { uploadToImageBB } from "@/lib/image-upload";
import { addMedia } from "../../media/media-action";
import { updateAdvertisement } from "../ads-action";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  variant: z.nativeEnum(AdVariant),
  mediaId: z.string().optional(),
  targetUrl: z.string().url({ message: "Please enter a valid URL" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
});

interface EditAdFormProps {
  initialData: Advertisement & {
    media: {
      url: string;
      type: string;
    };
  };
}

export const EditAdForm = ({ initialData }: EditAdFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMediaId, setSelectedMediaId] = useState<string | undefined>(
    initialData.mediaId
  );
  const [selectedMediaType, setSelectedMediaType] = useState<"IMAGE">("IMAGE");
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string | null>(
    initialData.media.url
  );
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [imageError, setImageError] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title,
      variant: initialData.variant,
      mediaId: initialData.mediaId,
      targetUrl: initialData.link,
      startDate: initialData.startDate
        ? new Date(initialData.startDate).toISOString().split("T")[0]
        : "",
      endDate: initialData.endDate
        ? new Date(initialData.endDate).toISOString().split("T")[0]
        : "",
    },
  });

  const handleMediaSelect = (id: string, url: string, type: "IMAGE") => {
    setSelectedMediaType(type);
    setSelectedMediaUrl(url);
    setSelectedMediaId(id);
    setSelectedFile(null);
    setImageError(false);
    form.setValue("mediaId", id);
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setSelectedMediaType("IMAGE");
    setSelectedMediaUrl(file ? URL.createObjectURL(file) : null);
    setSelectedMediaId(undefined);
    setImageError(false);
    form.setValue("mediaId", undefined);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!selectedFile && !selectedMediaId && !selectedMediaUrl) {
        setImageError(true);
        toast.error("Please select media");
        return;
      }

      setLoading(true);
      let finalMediaId = selectedMediaId;

      if (selectedFile) {
        const imageUrl = await uploadToImageBB(selectedFile);
        const newMedia = await addMedia({
          title: values.title,
          url: imageUrl,
          type: "IMAGE",
          description: "Advertisement media",
          size: selectedFile.size,
          mimeType: selectedFile.type,
        });
        finalMediaId = newMedia.id;
      }

      const startDate = new Date(values.startDate);
      const endDate = new Date(values.endDate);

      const result = await updateAdvertisement(initialData.id, {
        title: values.title,
        link: values.targetUrl,
        mediaId: finalMediaId,
        variant: values.variant,
        startDate: startDate,
        endDate: endDate,
        status: initialData.status,
      });

      if (result) {
        toast.success("Advertisement updated successfully");
        router.push("/dashboard/ads");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Edit Advertisement"
          description="Modify your advertisement details"
        />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Advertisement title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="variant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select advertisement type"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="POPUP">Popup</SelectItem>
                      <SelectItem value="HORIZONTAL">Horizontal</SelectItem>
                      <SelectItem value="VERTICAL">Vertical</SelectItem>
                      <SelectItem value="SQUARE">Square</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    placeholder="Advertisement description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mediaId"
            render={() => (
              <FormItem>
                <FormLabel className={imageError ? "text-red-500" : ""}>
                  Advertisement Media
                </FormLabel>
                <div
                  className="cursor-pointer border-2 border-dashed rounded-lg p-4 hover:border-primary transition-colors"
                  onClick={() => setShowMediaSelector(true)}
                >
                  {selectedMediaUrl ? (
                    <div className="relative aspect-video w-full max-w-sm mx-auto">
                      <Image
                        src={selectedMediaUrl}
                        alt="Selected media"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to select advertisement media
                      </p>
                    </div>
                  )}
                </div>
                {imageError && (
                  <p className="text-sm font-medium text-red-500">
                    Please select media
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="targetUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="https://example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input disabled={loading} type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input disabled={loading} type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>

      <MediaSelectorModal
        open={showMediaSelector}
        onOpenChange={setShowMediaSelector}
        onMediaSelect={(id: string, url: string, type: "IMAGE" | "VIDEO") => {
          if (type === "IMAGE") {
            handleMediaSelect(id, url, "IMAGE");
          }
        }}
        onFileSelect={handleFileSelect}
        reset={false}
        imageError={imageError}
        showLibrary={true}
        allowedTypes={["upload", "library"]}
      />
    </div>
  );
};
