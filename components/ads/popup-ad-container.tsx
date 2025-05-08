import { PopupAd } from "@/components/ads/popup-ad";
import prisma from "@/lib/prisma";

async function getActivePopupAd() {
  const now = new Date();

  const popupAd = await prisma.advertisement.findFirst({
    where: {
      variant: "POPUP",
      status: "PUBLISHED",
      startDate: {
        lte: now,
      },
      endDate: {
        gte: now,
      },
    },
    include: {
      media: true,
    },
  });

  return popupAd;
}

export async function PopupAdContainer() {
  const activeAd = await getActivePopupAd();

  if (!activeAd) return null;

  return (
    <PopupAd
      title={activeAd.title}
      imageUrl={activeAd.media.url}
      link={activeAd.link}
      isFirstVisit={activeAd.isFirstVisit}
    />
  );
}
