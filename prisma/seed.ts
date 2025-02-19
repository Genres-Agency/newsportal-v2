import { PrismaClient, MediaType } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Breaking News", description: "Latest and urgent news updates" },
  { name: "Politics", description: "Political news and updates" },
  { name: "Business & Economy", description: "Business and economic news" },
  { name: "Technology", description: "Technology and innovation news" },
  { name: "Health & Medicine", description: "Health and medical news" },
  { name: "Science", description: "Scientific discoveries and research" },
  { name: "Sports", description: "Sports news and updates" },
  { name: "Entertainment", description: "Entertainment industry news" },
  { name: "Lifestyle", description: "Lifestyle and culture news" },
  { name: "Education", description: "Education sector news" },
  { name: "Crime & Law", description: "Crime and legal news" },
  { name: "World News", description: "International news coverage" },
  {
    name: "Opinion & Editorials",
    description: "Opinion pieces and editorials",
  },
  { name: "Environment & Climate", description: "Environmental news" },
  { name: "Automobile", description: "Automotive industry news" },
  { name: "Real Estate", description: "Real estate market news" },
  { name: "Social Issues", description: "Social issues and society news" },
  { name: "Religion & Faith", description: "Religious and faith-based news" },
  { name: "Fact-Check", description: "Fact-checking and verification" },
];

async function main() {
  // First seed categories
  console.log("Seeding categories...");
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        name: category.name,
        slug: category.name.toLowerCase().replace(/[&\s]+/g, "-"),
        description: category.description,
      },
    });
  }
  console.log("✅ Categories seeded successfully!");

  // Seed media first with multiple entries
  console.log("Seeding media...");
  const mediaEntries = await prisma.$transaction([
    prisma.media.create({
      data: {
        title: "Programming Background",
        url: "https://i.ibb.co/whM9dFh3/programming-background-with-person-working-with-codes-computer.jpg",
        type: MediaType.IMAGE,
        description: "Programming background image",
        size: 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "Profile Image",
        url: "https://i.ibb.co/hF8XgBPG/me.jpg",
        type: MediaType.IMAGE,
        description: "Profile image",
        size: 512 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "Tech Tutorial",
        url: "https://www.youtube.com/embed/H3N_9iuedus",
        type: MediaType.VIDEO,
        description: "Technology tutorial video",
        size: 15 * 1024 * 1024,
        mimeType: "video/mp4",
      },
    }),
    prisma.media.create({
      data: {
        title: "Development Guide",
        url: "https://www.youtube.com/embed/hLL-Ix0ZkD4",
        type: MediaType.VIDEO,
        description: "Development guide video",
        size: 20 * 1024 * 1024,
        mimeType: "video/mp4",
      },
    }),
    prisma.media.create({
      data: {
        title: "News Banner",
        url: "https://i.ibb.co/jPmxThR1/Whats-App-Image-2024-12-27-at-5-59-28-PM.jpg",
        type: MediaType.IMAGE,
        description: "News banner image",
        size: 2048 * 1024,
        mimeType: "image/jpeg",
      },
    }),
  ]);
  console.log("✅ Media seeded successfully!");

  // Then seed news with varied media relations
  console.log("Seeding news...");
  await prisma.news.createMany({
    data: [
      {
        title: "AI Revolution in 2025",
        slug: "ai-revolution-2025",
        content:
          "Artificial Intelligence is transforming industries at a rapid pace...",
        category: "Technology",
        mediaId: mediaEntries[0].id,
        status: "PUBLISHED",
      },
      {
        title: "The Future of Programming",
        slug: "future-of-programming",
        content:
          "The programming industry is shifting towards AI-driven development...",
        category: "Technology",
        mediaId: mediaEntries[1].id,
        status: "PRIVATE",
      },
      {
        title: "Web Development Trends",
        slug: "web-development-trends",
        content:
          "Web development is evolving with Next.js and AI-powered design tools...",
        category: "Technology",
        mediaId: mediaEntries[2].id,
        status: "SCHEDULED",
        scheduledAt: new Date("2025-03-01"),
      },
      {
        title: "Cybersecurity Challenges",
        slug: "cybersecurity-challenges",
        content:
          "AI is creating new security challenges, making cybersecurity crucial...",
        category: "Technology",
        mediaId: mediaEntries[3].id,
        status: "PRIVATE",
      },
      {
        title: "Latest Tech News",
        slug: "latest-tech-news",
        content: "Breaking news in the technology sector...",
        category: "Technology",
        mediaId: mediaEntries[4].id,
        status: "PUBLISHED",
      },
      {
        title: "Top Programming Trends in 2025",
        slug: "top-programming-trends-2025",
        content:
          "The programming industry is shifting towards AI-driven development...",
        category: "Programming",
        mediaId: mediaEntries[0].id,
        status: "PRIVATE",
      },
      {
        title: "Future of Web Development",
        slug: "future-of-web-development",
        content:
          "Web development is evolving with Next.js and AI-powered design tools...",
        category: "Technology",
        mediaId: mediaEntries[1].id,
        status: "SCHEDULED",
        scheduledAt: new Date("2025-03-01"),
      },
      {
        title: "The Role of Cybersecurity in AI",
        slug: "role-of-cybersecurity-in-ai",
        content:
          "AI is creating new security challenges, making cybersecurity crucial...",
        category: "Technology",
        mediaId: mediaEntries[2].id,
        status: "PRIVATE",
      },
      {
        title: "JavaScript's Evolution in 2025",
        slug: "javascript-evolution-2025",
        content:
          "New JavaScript features like pattern matching are changing the game...",
        category: "Programming",
        mediaId: mediaEntries[3].id,
        status: "PUBLISHED",
      },
      {
        title: "The Rise of Remote Work",
        slug: "rise-of-remote-work",
        content:
          "Remote work continues to grow with better collaboration tools...",
        category: "Business",
        mediaId: mediaEntries[4].id,
        status: "PRIVATE",
      },
      {
        title: "Next.js 15: What's New?",
        slug: "nextjs-15-new-features",
        content:
          "Next.js 15 introduces faster SSR and improved server components...",
        category: "Technology",
        mediaId: mediaEntries[0].id,
        status: "PUBLISHED",
      },
      {
        title: "Cloud Computing in 2025",
        slug: "cloud-computing-2025",
        content: "Cloud providers are innovating with AI-powered automation...",
        category: "Technology",
        mediaId: mediaEntries[1].id,
        status: "PRIVATE",
      },
      {
        title: "The Impact of Blockchain on Finance",
        slug: "blockchain-impact-finance",
        content:
          "Blockchain is revolutionizing how financial transactions work...",
        category: "Finance",
        mediaId: mediaEntries[2].id,
        status: "PUBLISHED",
      },
      {
        title: "5G Expansion Worldwide",
        slug: "5g-expansion-worldwide",
        content: "5G networks are being deployed at a record pace in 2025...",
        category: "Technology",
        mediaId: mediaEntries[3].id,
        status: "PRIVATE",
      },
      {
        title: "The Future of Electric Vehicles",
        slug: "future-of-electric-vehicles",
        content:
          "EV technology is improving with better batteries and charging...",
        category: "Automobile",
        mediaId: mediaEntries[4].id,
        status: "PUBLISHED",
      },
      {
        title: "Quantum Computing Breakthrough",
        slug: "quantum-computing-breakthrough",
        content:
          "Scientists have achieved a new milestone in quantum computing...",
        category: "Science",
        mediaId: mediaEntries[0].id,
        status: "PRIVATE",
      },
    ],
  });
  console.log("✅ News seeded successfully!");

  // Create admin user
  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@gmail.com",
      password: "$2a$10$D32T4lzBzuucgBgqhUzqQ.KU2r.enUML9L0ihVcy8Odn0AdkOsuja", // "password123"
      role: "SUPERADMIN",
    },
  });

  console.log("✅ Super Admin user seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
