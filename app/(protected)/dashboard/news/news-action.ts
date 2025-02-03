"use server";

export const postNews = async ({
  data,
  image,
}: {
  name: string;
  parentId?: string;
  description?: string;
  order?: number;
}) => {
  try {
    const slug = slugify(name, { lower: true });

    // Get parent panel to determine level and path
    const parentPanel = parentId
      ? await client.panel.findUnique({
          where: { id: parentId },
          select: { level: true, path: true },
        })
      : null;

    const level = parentPanel ? parentPanel.level + 1 : 0;
    const path = parentPanel ? `${parentPanel.path}/${slug}` : slug;

    const panel = await client.panel.create({
      data: {
        name,
        slug,
        description,
        level,
        path,
        parentId,
        order: order ?? 0,
      },
    });
    return panel;
  } catch (error) {
    throw new Error(`Failed to create panel: ${error}`);
  }
};
