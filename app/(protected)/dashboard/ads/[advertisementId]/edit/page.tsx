import { getAdvertisements } from "../../ads-action";
import { EditAdForm } from "../../_components/edit-ad-form";

interface EditAdvertisementPageProps {
  params: Promise<{
    advertisementId: string;
  }>;
}

export default async function EditAdvertisementPage({
  params,
}: EditAdvertisementPageProps) {
  const ads = await getAdvertisements();
  const { advertisementId } = await params;
  const advertisement = ads.find((ad) => ad.id === advertisementId);

  if (!advertisement) {
    return <div>Advertisement not found</div>;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EditAdForm initialData={advertisement} />
      </div>
    </div>
  );
}
