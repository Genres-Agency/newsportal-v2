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
        title: "সাফল্য ১",
        url: "https://i.ibb.co.com/G37CknF5/new1.jpg",
        type: MediaType.IMAGE,
        description: "সাফল্যের ছবি ১",
        size: 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "সাফল্য ২",
        url: "https://i.ibb.co.com/YFFQ7GQ2/new2.jpg",
        type: MediaType.IMAGE,
        description: "সাফল্যের ছবি ২",
        size: 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "সাফল্য ৩",
        url: "https://i.ibb.co.com/ZzMwgMLz/new3.jpg",
        type: MediaType.IMAGE,
        description: "সাফল্যের ছবি ৩",
        size: 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "সাফল্য ৪",
        url: "https://i.ibb.co.com/KnrVr0B/news4.jpg",
        type: MediaType.IMAGE,
        description: "সাফল্যের ছবি ৪",
        size: 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "সাফল্য ৫",
        url: "https://i.ibb.co.com/Hf1pCCzH/news5.jpg",
        type: MediaType.IMAGE,
        description: "সাফল্যের ছবি ৫",
        size: 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "সাফল্য ৬",
        url: "https://i.ibb.co.com/WNc0xvWw/sucess6.jpg",
        type: MediaType.IMAGE,
        description: "সাফল্যের ছবি ৬",
        size: 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "সাফল্য ৭",
        url: "https://i.ibb.co.com/hRgPKvv6/sucess3.jpg",
        type: MediaType.IMAGE,
        description: "সাফল্যের ছবি ৭",
        size: 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "রাজনীতি",
        url: "https://images.prothomalo.com/prothomalo-bangla/2024-01/8c0ca674-3fb8-4fef-aa2d-8f6b2aa7a5e3/Untitled_1.jpg",
        type: MediaType.IMAGE,
        description: "রাজনৈতিক সংবাদ ছবি",
        size: 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "খেলাধুলা",
        url: "https://images.prothomalo.com/prothomalo-bangla/2024-01/4b9e0b6c-2e1d-4e1e-9c2f-1b8b3f0b0b1a/cricket.jpg",
        type: MediaType.IMAGE,
        description: "ক্রিকেট খেলার ছবি",
        size: 512 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "বিনোদন",
        url: "https://images.prothomalo.com/prothomalo-bangla/2024-01/7d5e0b6c-2e1d-4e1e-9c2f-1b8b3f0b0b1a/entertainment.jpg",
        type: MediaType.IMAGE,
        description: "বিনোদন সংবাদ ছবি",
        size: 15 * 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "আন্তর্জাতিক",
        url: "https://images.prothomalo.com/prothomalo-bangla/2024-01/6d5e0b6c-2e1d-4e1e-9c2f-1b8b3f0b0b1a/international.jpg",
        type: MediaType.IMAGE,
        description: "আন্তর্জাতিক সংবাদ ছবি",
        size: 20 * 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "অর্থনীতি",
        url: "https://images.prothomalo.com/prothomalo-bangla/2024-01/5d5e0b6c-2e1d-4e1e-9c2f-1b8b3f0b0b1a/economy.jpg",
        type: MediaType.IMAGE,
        description: "অর্থনীতি সংবাদ ছবি",
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
      // Politics News
      {
        title: "নির্বাচন নিয়ে রাজনৈতিক দলগুলোর মধ্যে আলোচনা শুরু",
        slug: "election-political-parties-discussion",
        content:
          "বাংলাদেশের প্রধান রাজনৈতিক দলগুলো আসন্ন নির্বাচন নিয়ে আলোচনায় বসেছে। সকল দলের অংশগ্রহণে একটি সুষ্ঠু নির্বাচনের আশা করা হচ্ছে...",
        category: "Politics",
        mediaId: mediaEntries[7].id,
        status: "PUBLISHED",
      },
      {
        title: "সংসদে নতুন আইন পাস",
        slug: "new-law-passed-in-parliament",
        content:
          "গতকাল সংসদে একটি গুরুত্বপূর্ণ আইন পাস হয়েছে। এই আইনের মাধ্যমে নাগরিক অধিকার আরও সুরক্ষিত হবে বলে আশা করা হচ্ছে...",
        category: "Politics",
        mediaId: mediaEntries[7].id,
        status: "PUBLISHED",
      },
      // Sports News
      {
        title: "বাংলাদেশ ক্রিকেট দলের নতুন অধ্যায়",
        slug: "bangladesh-cricket-team-new-chapter",
        content:
          "বাংলাদেশ ক্রিকেট দলের নতুন অধিনায়ক নিয়োগ করা হয়েছে। তার নেতৃত্বে দল নতুন উচ্চতায় পৌঁছাবে বলে আশা করা হচ্ছে...",
        category: "Sports",
        mediaId: mediaEntries[8].id,
        status: "PUBLISHED",
      },
      {
        title: "ফুটবল লিগে নতুন রেকর্ড",
        slug: "football-league-new-record",
        content:
          "বাংলাদেশ প্রিমিয়ার লিগে একটি নতুন রেকর্ড স্থাপিত হয়েছে। এক খেলোয়াড় একটি ম্যাচে পাঁচটি গোল করে ইতিহাস গড়েছেন...",
        category: "Sports",
        mediaId: mediaEntries[8].id,
        status: "PUBLISHED",
      },
      // Entertainment News
      {
        title: "চলচ্চিত্র জগতে নতুন প্রতিভা",
        slug: "new-talent-in-film-industry",
        content:
          "বাংলাদেশের চলচ্চিত্র জগতে নতুন প্রতিভার আবির্ভাব ঘটেছে। তার প্রথম ছবি ইতিমধ্যে দর্শকদের মন জয় করেছে...",
        category: "Entertainment",
        mediaId: mediaEntries[9].id,
        status: "PUBLISHED",
      },
      {
        title: "সংগীত জগতে নতুন আলোড়ন",
        slug: "new-wave-in-music-industry",
        content:
          "বাংলা গানের জগতে নতুন ধারার সংগীত শ্রোতাদের মুগ্ধ করছে। যুব প্রজন্মের শিল্পীরা ঐতিহ্য ও আধুনিকতার সমন্বয় ঘটাচ্ছেন...",
        category: "Entertainment",
        mediaId: mediaEntries[9].id,
        status: "PUBLISHED",
      },
      // World News
      {
        title: "মধ্যপ্রাচ্যে নতুন রাজনৈতিক সমীকরণ",
        slug: "new-political-equation-in-middle-east",
        content:
          "মধ্যপ্রাচ্যে নতুন রাজনৈতিক সমীকরণ তৈরি হচ্ছে। এর প্রভাব বিশ্ব রাজনীতিতে গভীর ছাপ ফেলবে বলে বিশ্লেষকরা মনে করছেন...",
        category: "World News",
        mediaId: mediaEntries[10].id,
        status: "PUBLISHED",
      },
      {
        title: "জলবায়ু পরিবর্তন নিয়ে আন্তর্জাতিক সম্মেলন",
        slug: "international-conference-on-climate-change",
        content:
          "জলবায়ু পরিবর্তন মোকাবেলায় নতুন আন্তর্জাতিক সম্মেলন শুরু হচ্ছে। বিশ্বের বিভিন্ন দেশের নেতারা এতে অংশ নিচ্ছেন...",
        category: "World News",
        mediaId: mediaEntries[10].id,
        status: "PUBLISHED",
      },
      // Business & Economy
      {
        title: "অর্থনীতিতে নতুন মাইলফলক",
        slug: "new-milestone-in-economy",
        content:
          "বাংলাদেশের অর্থনীতি নতুন মাইলফলক অর্জন করেছে। রপ্তানি আয় ও রেমিট্যান্স প্রবাহ বৃদ্ধি পেয়েছে...",
        category: "Business & Economy",
        mediaId: mediaEntries[11].id,
        status: "PUBLISHED",
      },
      {
        title: "শেয়ার বাজারে নতুন বিনিয়োগ",
        slug: "new-investment-in-stock-market",
        content:
          "দেশের শেয়ার বাজারে বড় ধরনের বিনিয়োগ আসছে। এতে বাজারে নতুন গতি আসবে বলে আশা করা হচ্ছে...",
        category: "Business & Economy",
        mediaId: mediaEntries[11].id,
        status: "PUBLISHED",
      },
      // Technology News
      {
        title: "নতুন প্রযুক্তির উদ্ভাবন",
        slug: "new-technology-innovation",
        content:
          "বাংলাদেশি গবেষকরা একটি নতুন প্রযুক্তি উদ্ভাবন করেছেন। এই প্রযুক্তি দেশের ডিজিটাল অগ্রগতিতে নতুন মাত্রা যোগ করবে...",
        category: "Technology",
        mediaId: mediaEntries[0].id,
        status: "PUBLISHED",
      },
      // Health & Medicine
      {
        title: "স্বাস্থ্যসেবায় নতুন পদক্ষেপ",
        slug: "new-initiative-in-healthcare",
        content:
          "দেশের স্বাস্থ্যসেবা খাতে নতুন উদ্যোগ নেওয়া হয়েছে। এর ফলে গ্রামীণ জনগোষ্ঠী উন্নত চিকিৎসা সেবা পাবে...",
        category: "Health & Medicine",
        mediaId: mediaEntries[1].id,
        status: "PUBLISHED",
      },
      // Education
      {
        title: "শিক্ষাব্যবস্থায় ডিজিটাল পরিবর্তন",
        slug: "digital-transformation-in-education",
        content:
          "দেশের শিক্ষাব্যবস্থায় ডিজিটাল পরিবর্তন আসছে। অনলাইন শিক্ষা পদ্ধতি আরও সমৃদ্ধ হচ্ছে...",
        category: "Education",
        mediaId: mediaEntries[2].id,
        status: "PUBLISHED",
      },
      // Environment & Climate
      {
        title: "পরিবেশ সংরক্ষণে নতুন প্রকল্প",
        slug: "new-project-in-environmental-conservation",
        content:
          "পরিবেশ সংরক্ষণে সরকার নতুন প্রকল্প হাতে নিয়েছে। এই প্রকল্পের মাধ্যমে বনায়ন ও জীববৈচিত্র্য রক্ষা করা হবে...",
        category: "Environment & Climate",
        mediaId: mediaEntries[3].id,
        status: "PUBLISHED",
      },
      // Social Issues
      {
        title: "নারী উন্নয়নে নতুন কর্মসূচি",
        slug: "new-program-for-women-development",
        content:
          "নারী উন্নয়নে সরকার নতুন কর্মসূচি গ্রহণ করেছে। এর মাধ্যমে নারীদের আর্থ-সামাজিক উন্নয়ন ত্বরান্বিত হবে...",
        category: "Social Issues",
        mediaId: mediaEntries[4].id,
        status: "PUBLISHED",
      },
      // Breaking News
      {
        title: "জরুরি: বড় ধরনের শিল্প চুক্তি স্বাক্ষর",
        slug: "breaking-major-industrial-agreement-signed",
        content:
          "দেশের ইতিহাসে সবচেয়ে বড় শিল্প চুক্তি স্বাক্ষরিত হলো। এর ফলে হাজার হাজার কর্মসংস্থান সৃষ্টি হবে...",
        category: "Breaking News",
        mediaId: mediaEntries[5].id,
        status: "PUBLISHED",
      },
      // Science
      {
        title: "বাংলাদেশি বিজ্ঞানীদের নতুন আবিষ্কার",
        slug: "new-discovery-by-bangladeshi-scientists",
        content:
          "বাংলাদেশি বিজ্ঞানীরা একটি নতুন জীবাণু আবিষ্কার করেছেন। এই আবিষ্কার চিকিৎসা বিজ্ঞানে নতুন সম্ভাবনার দ্বার খুলবে...",
        category: "Science",
        mediaId: mediaEntries[6].id,
        status: "PUBLISHED",
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
      password: "$2a$10$D32T4lzBzuucgBgqhUzqQ.KU2r.enUML9L0ihVcy8Odn0AdkOsuja", // "aaaaaa"
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
