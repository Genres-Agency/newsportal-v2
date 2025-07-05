"use server";

import { auth } from "@/server/auth";
import { UserRole, AdVariant, NewsStatus } from "@prisma/client";
import { db } from "@/server/db";

type ErrorWithMessage = {
  message: string;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;
  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
};

// Function to check if user has admin access
export async function hasAdminAccess() {
  try {
    const session = await auth();
    return session?.user?.role === UserRole.ADMIN;
  } catch (error) {
    return false;
  }
}

// Get all advertisements
export async function getAdvertisements(variant?: AdVariant) {
  if (!(await hasAdminAccess())) {
    throw new Error("Unauthorized access");
  }

  try {
    const ads = await db.advertisement.findMany({
      where: variant ? { variant } : undefined,
      include: {
        media: true,
      },
    });
    return ads;
  } catch (error) {
    throw new Error("Failed to fetch advertisements");
  }
}

// Create a new advertisement
export async function createAdvertisement({
  title,
  link,
  mediaId,
  variant,
  status = NewsStatus.PUBLISHED,
  scheduledAt,
}: {
  title: string;
  link: string;
  mediaId: string;
  variant: AdVariant;
  status?: NewsStatus;
  scheduledAt?: Date;
}) {
  if (!(await hasAdminAccess())) {
    throw new Error(
      "Unauthorized: Only administrators can create advertisements"
    );
  }

  try {
    const ad = await db.advertisement.create({
      data: {
        title,
        link,
        mediaId,
        variant,
        status,
      },
      include: {
        media: true,
      },
    });
    return ad;
  } catch (error) {
    const errorMessage = toErrorWithMessage(error);
    throw new Error(`Failed to create advertisement: ${errorMessage.message}`);
  }
}

// Update an advertisement
export async function updateAdvertisement(
  id: string,
  data: {
    title?: string;
    link?: string;
    mediaId?: string;
    variant?: AdVariant;
    status?: NewsStatus;
    startDate?: Date | null;
    endDate?: Date | null;
  }
) {
  if (!(await hasAdminAccess())) {
    throw new Error(
      "Unauthorized: Only administrators can update advertisements"
    );
  }

  try {
    // Validate if advertisement exists
    const existingAd = await db.advertisement.findUnique({
      where: { id },
    });

    if (!existingAd) {
      throw new Error(`Advertisement with ID ${id} not found`);
    }

    const ad = await db.advertisement.update({
      where: { id },
      data,
      include: {
        media: true,
      },
    });
    return ad;
  } catch (error) {
    const errorMessage = toErrorWithMessage(error);
    throw new Error(`Failed to update advertisement: ${errorMessage.message}`);
  }
}

// Delete an advertisement
export async function deleteAdvertisement(id: string) {
  if (!(await hasAdminAccess())) {
    throw new Error(
      "Unauthorized: Only administrators can delete advertisements"
    );
  }

  try {
    // Validate if advertisement exists
    const existingAd = await db.advertisement.findUnique({
      where: { id },
    });

    if (!existingAd) {
      throw new Error(`Advertisement with ID ${id} not found`);
    }

    await db.advertisement.delete({
      where: { id },
    });
    return { success: true, message: "Advertisement deleted successfully" };
  } catch (error) {
    const errorMessage = toErrorWithMessage(error);
    throw new Error(`Failed to delete advertisement: ${errorMessage.message}`);
  }
}
