import cron from "node-cron";
import client from "@/prisma";

// Schedule a job to run every minute
cron.schedule("30 0 * * *", async () => {
  try {
    const now = new Date();
    console.log(`Cron job executed at: ${now.toISOString()}`);

    // Fetch scheduled news that should be published
    const scheduledNews = await client.news.findMany({
      where: {
        status: "SCHEDULED",
        scheduledAt: {
          lte: now, // Less than or equal to current time
        },
      },
    });

    console.log(`Found ${scheduledNews.length} scheduled news items.`);

    // Update the status of each scheduled news item to 'PUBLISHED'
    const publishPromises = scheduledNews.map(async (newsItem) => {
      return await client.news.update({
        where: { id: newsItem.id },
        data: { status: "PUBLISHED" },
      });
    });

    await Promise.all(publishPromises);

    console.log(`${scheduledNews.length} news items published successfully.`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error details:", error.message, error.stack);
    } else {
      console.error("Unknown error:", error);
    }
  }
});
