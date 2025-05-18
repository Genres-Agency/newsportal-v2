import { PrismaClient, MediaType, NewsStatus } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "জরুরি সংবাদ", description: "সর্বশেষ এবং জরুরি সংবাদ আপডেট" },
  { name: "রাজনীতি", description: "রাজনৈতিক সংবাদ এবং আপডেট" },
  { name: "বাংলাদেশ", description: "বাংলাদেশ সংবাদ এবং আপডেট" },
  { name: "ব্যবসা ও অর্থনীতি", description: "ব্যবসা এবং অর্থনৈতিক সংবাদ" },
  { name: "প্রযুক্তি", description: "প্রযুক্তি এবং উদ্ভাবন সংবাদ" },
  { name: "স্বাস্থ্য ও চিকিৎসা", description: "স্বাস্থ্য এবং চিকিৎসা সংবাদ" },
  { name: "বিজ্ঞান", description: "বৈজ্ঞানিক আবিষ্কার এবং গবেষণা" },
  { name: "খেলাধুলা", description: "ক্রীড়া সংবাদ এবং আপডেট" },
  { name: "বিনোদন", description: "বিনোদন শিল্প সংবাদ" },
  { name: "জীবনযাপন", description: "জীবনযাপন এবং সংস্কৃতি সংবাদ" },
  { name: "শিক্ষা", description: "শিক্ষাখাত সংবাদ" },
  { name: "অপরাধ ও আইন", description: "অপরাধ এবং আইনি সংবাদ" },
  { name: "আন্তর্জাতিক", description: "আন্তর্জাতিক সংবাদ কভারেজ" },
  {
    name: "মতামত ও সম্পাদকীয়",
    description: "মতামত এবং সম্পাদকীয় নিবন্ধ",
  },
  { name: "পরিবেশ ও জলবায়ু", description: "পরিবেশ সংক্রান্ত সংবাদ" },
  { name: "অটোমোবাইল", description: "অটোমোবাইল শিল্প সংবাদ" },
  { name: "রিয়েল এস্টেট", description: "রিয়েল এস্টেট বাজার সংবাদ" },
  { name: "সামাজিক বিষয়", description: "সামাজিক বিষয় এবং সমাজ সংবাদ" },
  { name: "ধর্ম ও বিশ্বাস", description: "ধর্মীয় এবং বিশ্বাস-ভিত্তিক সংবাদ" },
  { name: "তথ্য যাচাই", description: "তথ্য যাচাই এবং সত্যতা নিরূপণ" },
];

async function main() {
  // Create admin user first
  console.log("Creating admin user...");
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      name: "Admin",
      role: "SUPERADMIN",
      settings: {
        create: {
          siteName: "News Portal",
          layout: "modern",
          primaryColor: "#1a73e8",
          secondaryColor: "#4285f4",
        },
      },
    },
  });
  console.log("✅ Admin user and settings created successfully!");

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
        url: "https://i.ibb.co.com/TxnwpJV7/nassa-680cd8f4a7747.jpg",
        type: MediaType.IMAGE,
        description: "রাজনৈতিক সংবাদ ছবি",
        size: 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "খেলাধুলা ১",
        url: "https://i.ibb.co.com/pjq9XNcR/image.jpg",
        type: MediaType.IMAGE,
        description: "ক্রিকেট খেলার ছবি ১",
        size: 512 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "খেলাধুলা ২",
        url: "https://i.ibb.co.com/GfLBF70B/image.jpg",
        type: MediaType.IMAGE,
        description: "ক্রিকেট খেলার ছবি ২",
        size: 512 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "বিনোদন",
        url: "https://i.ibb.co.com/BSrmLz8/RE-67fccc38358f2.jpg",
        type: MediaType.IMAGE,
        description: "বিনোদন সংবাদ ছবি",
        size: 15 * 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "আন্তর্জাতিক",
        url: "https://i.ibb.co.com/GQs47NP0/Untitled-680e381db0a46.jpg",
        type: MediaType.IMAGE,
        description: "আন্তর্জাতিক সংবাদ ছবি",
        size: 20 * 1024 * 1024,
        mimeType: "image/jpeg",
      },
    }),
    prisma.media.create({
      data: {
        title: "অর্থনীতি",
        url: "https://i.ibb.co.com/fGnsYXcF/680f20ead64dd.jpg",
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
  // Create news entries with categories
  console.log("Creating news entries with categories...");

  const newsData = [
    {
      title: "নির্বাচন নিয়ে রাজনৈতিক দলগুলোর মধ্যে আলোচনা শুরু",
      slug: "election-political-parties-disc5ussion",
      content:
        "বাংলাদেশের প্রধান রাজনৈতিক দলগুলো আসন্ন নির্বাচন নিয়ে আলোচনায় বসেছে। সকল দলের অংশগ্রহণে একটি সুষ্ঠু নির্বাচনের আশা করা হচ্ছে...",
      mediaId: mediaEntries[7].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [
          { category: { connect: { name: "বাংলাদেশ" } } },
          { category: { connect: { name: "রাজনীতি" } } },
          { category: { connect: { name: "জরুরি সংবাদ" } } },
        ],
      },
    },
    {
      title: "সংসদে নতুন আইন পাস",
      slug: "new-law-passed-in-parliament",
      content:
        "গতকাল সংসদে একটি গুরুত্বপূর্ণ আইন পাস হয়েছে। এই আইনের মাধ্যমে নাগরিক অধিকার আরও সুরক্ষিত হবে বলে আশা করা হচ্ছে...",
      mediaId: mediaEntries[2].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [{ category: { connect: { name: "রাজনীতি" } } }],
      },
    },
    {
      title: "বাংলাদেশ ক্রিকেট দলের নতুন অধ্যায়",
      slug: "bangladesh-cricket-team-new-cha5pter",
      content:
        "বাংলাদেশ ক্রিকেট দলের নতুন অধিনায়ক নিয়োগ করা হয়েছে। তার নেতৃত্বে দল নতুন উচ্চতায় পৌঁছাবে বলে আশা করা হচ্ছে...",
      mediaId: mediaEntries[8].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [
          { category: { connect: { name: "খেলাধুলা" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
    },
    {
      title: "ফুটবল লিগে নতুন রেকর্ড",
      slug: "football-league-new-rec5ord",
      content:
        "বাংলাদেশ প্রিমিয়ার লিগে একটি নতুন রেকর্ড স্থাপিত হয়েছে। এক খেলোয়াড় একটি ম্যাচে পাঁচটি গোল করে ইতিহাস গড়েছেন...",
      mediaId: mediaEntries[9].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [{ category: { connect: { name: "খেলাধুলা" } } }],
      },
    },
    {
      title: "চলচ্চিত্র জগতে নতুন প্রতিভা",
      slug: "new-talent-in-film-indus5try",
      content:
        "বাংলাদেশের চলচ্চিত্র জগতে নতুন প্রতিভার আবির্ভাব ঘটেছে। তার প্রথম ছবি ইতিমধ্যে দর্শকদের মন জয় করেছে...",
      mediaId: mediaEntries[9].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [{ category: { connect: { name: "বিনোদন" } } }],
      },
    },
    {
      title: "সংগীত জগতে নতুন আলোড়ন",
      slug: "new-wave-in-5music-industry",
      content:
        "বাংলা গানের জগতে নতুন ধারার সংগীত শ্রোতাদের মুগ্ধ করছে। যুব প্রজন্মের শিল্পীরা ঐতিহ্য ও আধুনিকতার সমন্বয় ঘটাচ্ছেন...",
      mediaId: mediaEntries[1].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [
          { category: { connect: { name: "বিনোদন" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
    },
    {
      title: "মধ্যপ্রাচ্যে নতুন রাজনৈতিক সমীকরণ",
      slug: "new-political-equat5ion-in-middle-east",
      content:
        "মধ্যপ্রাচ্যে নতুন রাজনৈতিক সমীকরণ তৈরি হচ্ছে। এর প্রভাব বিশ্ব রাজনীতিতে গভীর ছাপ ফেলবে বলে বিশ্লেষকরা মনে করছেন...",
      mediaId: mediaEntries[10].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [{ category: { connect: { name: "আন্তর্জাতিক" } } }],
      },
    },
    {
      title: "জলবায়ু পরিবর্তন নিয়ে আন্তর্জাতিক সম্মেলন",
      slug: "international-co5nference-on-climate-change",
      content:
        "জলবায়ু পরিবর্তন মোকাবেলায় নতুন আন্তর্জাতিক সম্মেলন শুরু হচ্ছে। বিশ্বের বিভিন্ন দেশের নেতারা এতে অংশ নিচ্ছেন...",
      mediaId: mediaEntries[0].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [
          { category: { connect: { name: "আন্তর্জাতিক" } } },
          { category: { connect: { name: "পরিবেশ ও জলবায়ু" } } },
        ],
      },
    },
    {
      title: "অর্থনীতিতে নতুন মাইলফলক",
      slug: "new-milestone-in-econom6y",
      content:
        "বাংলাদেশের অর্থনীতি নতুন মাইলফলক অর্জন করেছে। রপ্তানি আয় ও রেমিট্যান্স প্রবাহ বৃদ্ধি পেয়েছে...",
      mediaId: mediaEntries[11].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [
          { category: { connect: { name: "ব্যবসা ও অর্থনীতি" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
    },
    {
      title: "শেয়ার বাজারে নতুন বিনিয়োগ",
      slug: "new-investment-in-stock-6arket",
      content:
        "দেশের শেয়ার বাজারে বড় ধরনের বিনিয়োগ আসছে। এতে বাজারে নতুন গতি আসবে বলে আশা করা হচ্ছে...",
      mediaId: mediaEntries[3].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [{ category: { connect: { name: "ব্যবসা ও অর্থনীতি" } } }],
      },
    },
    {
      title: "নতুন প্রযুক্তির উদ্ভাবন",
      slug: "new-technology-innovat6ion",
      content:
        "বাংলাদেশি গবেষকরা একটি নতুন প্রযুক্তি উদ্ভাবন করেছেন। এই প্রযুক্তি দেশের ডিজিটাল অগ্রগতিতে নতুন মাত্রা যোগ করবে...",
      mediaId: mediaEntries[0].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [
          { category: { connect: { name: "প্রযুক্তি" } } },
          { category: { connect: { name: "বিজ্ঞান" } } },
        ],
      },
    },
    {
      title: "স্বাস্থ্যসেবায় নতুন পদক্ষেপ",
      slug: "new-initiative-in-healthcar5e",
      content:
        "দেশের স্বাস্থ্যসেবা খাতে নতুন উদ্যোগ নেওয়া হয়েছে। এর ফলে গ্রামীণ জনগোষ্ঠী উন্নত চিকিৎসা সেবা পাবে...",
      mediaId: mediaEntries[1].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [{ category: { connect: { name: "স্বাস্থ্য ও চিকিৎসা" } } }],
      },
    },
    {
      title: "শিক্ষাব্যবস্থায় ডিজিটাল পরিবর্তন",
      slug: "digital-transform5ation-in-education",
      content:
        "দেশের শিক্ষাব্যবস্থায় ডিজিটাল পরিবর্তন আসছে। অনলাইন শিক্ষা পদ্ধতি আরও সমৃদ্ধ হচ্ছে...",
      mediaId: mediaEntries[2].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [
          { category: { connect: { name: "শিক্ষা" } } },
          { category: { connect: { name: "প্রযুক্তি" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
    },
    {
      title: "পরিবেশ সংরক্ষণে নতুন প্রকল্প",
      slug: "new-project-in-environmenta5l-conservation",
      content:
        "পরিবেশ সংরক্ষণে সরকার নতুন প্রকল্প হাতে নিয়েছে। এই প্রকল্পের মাধ্যমে বনায়ন ও জীববৈচিত্র্য রক্ষা করা হবে...",
      mediaId: mediaEntries[3].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [{ category: { connect: { name: "পরিবেশ ও জলবায়ু" } } }],
      },
    },
    {
      title: "নারী উন্নয়নে নতুন কর্মসূচি",
      slug: "new-program-for-6women-development1",
      content:
        "নারী উন্নয়নে সরকার নতুন কর্মসূচি গ্রহণ করেছে। এর মাধ্যমে নারীদের আর্থ-সামাজিক উন্নয়ন ত্বরান্বিত হবে...",
      mediaId: mediaEntries[4].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [{ category: { connect: { name: "সামাজিক বিষয়" } } }],
      },
    },
    {
      title: "জরুরি: বড় ধরনের শিল্প চুক্তি স্বাক্ষর",
      slug: "breaking-major-industria7l-agreement-signed1",
      content:
        "দেশের ইতিহাসে সবচেয়ে বড় শিল্প চুক্তি স্বাক্ষরিত হলো। এর ফলে হাজার হাজার কর্মসংস্থান সৃষ্টি হবে...",
      mediaId: mediaEntries[5].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [
          { category: { connect: { name: "জরুরি সংবাদ" } } },
          { category: { connect: { name: "ব্যবসা ও অর্থনীতি" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
    },
    {
      title: "বাংলাদেশি বিজ্ঞানীদের নতুন আবিষ্কার",
      slug: "new-discovery-by-bangladeshi-scie7ntists1",
      content:
        "বাংলাদেশি বিজ্ঞানীরা একটি নতুন জীবাণু আবিষ্কার করেছেন। এই আবিষ্কার চিকিৎসা বিজ্ঞানে নতুন সম্ভাবনার দ্বার খুলবে...",
      mediaId: mediaEntries[6].id,
      status: NewsStatus.PUBLISHED,
      categories: {
        create: [
          { category: { connect: { name: "বিজ্ঞান" } } },
          { category: { connect: { name: "স্বাস্থ্য ও চিকিৎসা" } } },
        ],
      },
    },
    {
      title: "সংসদে নতুন আইন পাস",
      slug: "new-la7w-passed-in-parliament",
      content:
        "গতকাল সংসদে একটি গুরুত্বপূর্ণ আইন পাস হয়েছে। এই আইনের মাধ্যমে নাগরিক অধিকার আরও সুরক্ষিত হবে বলে আশা করা হচ্ছে...",
      categories: {
        create: [
          { category: { connect: { name: "রাজনীতি" } } },
          { category: { connect: { name: "স্বাস্থ্য ও চিকিৎসা" } } },
        ],
      },
      mediaId: mediaEntries[2].id,
      status: NewsStatus.PUBLISHED,
    },
    // Sports News
    {
      title: "বাংলাদেশ ক্রিকেট দলের নতুন অধ্যায়",
      slug: "banglad7esh-cricket-team-new-chapter",
      content:
        "বাংলাদেশ ক্রিকেট দলের নতুন অধিনায়ক নিয়োগ করা হয়েছে। তার নেতৃত্বে দল নতুন উচ্চতায় পৌঁছাবে বলে আশা করা হচ্ছে...",
      categories: {
        create: [
          { category: { connect: { name: "খেলাধুলা" } } },
          { category: { connect: { name: "স্বাস্থ্য ও চিকিৎসা" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
      mediaId: mediaEntries[8].id,
      status: NewsStatus.PUBLISHED,
    },
    {
      title: "ফুটবল লিগে নতুন রেকর্ড",
      slug: "football-leagu4e-new-record",
      content:
        "বাংলাদেশ প্রিমিয়ার লিগে একটি নতুন রেকর্ড স্থাপিত হয়েছে। এক খেলোয়াড় একটি ম্যাচে পাঁচটি গোল করে ইতিহাস গড়েছেন...",
      categories: {
        create: [
          { category: { connect: { name: "খেলাধুলা" } } },
          { category: { connect: { name: "স্বাস্থ্য ও চিকিৎসা" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
      mediaId: mediaEntries[9].id,
      status: NewsStatus.PUBLISHED,
    },
    // Entertainment News
    {
      title: "চলচ্চিত্র জগতে নতুন প্রতিভা",
      slug: "new-talent-in-film-industr2y",
      content:
        "বাংলাদেশের চলচ্চিত্র জগতে নতুন প্রতিভার আবির্ভাব ঘটেছে। তার প্রথম ছবি ইতিমধ্যে দর্শকদের মন জয় করেছে...",
      categories: {
        create: [
          { category: { connect: { name: "খেলাধুলা" } } },
          { category: { connect: { name: "স্বাস্থ্য ও চিকিৎসা" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
      mediaId: mediaEntries[9].id,
      status: NewsStatus.PUBLISHED,
    },
    {
      title: "সংগীত জগতে নতুন আলোড়ন",
      slug: "new-wave-in-music-industry23",
      content:
        "বাংলা গানের জগতে নতুন ধারার সংগীত শ্রোতাদের মুগ্ধ করছে। যুব প্রজন্মের শিল্পীরা ঐতিহ্য ও আধুনিকতার সমন্বয় ঘটাচ্ছেন...",
      categories: {
        create: [
          { category: { connect: { name: "বিনোদন" } } },
          { category: { connect: { name: "স্বাস্থ্য ও চিকিৎসা" } } },
        ],
      },
      mediaId: mediaEntries[1].id,
      status: NewsStatus.PUBLISHED,
    },
    // World News
    {
      title: "মধ্যপ্রাচ্যে নতুন রাজনৈতিক সমীকরণ",
      slug: "new-political-equation-in-middle-east2",
      content:
        "মধ্যপ্রাচ্যে নতুন রাজনৈতিক সমীকরণ তৈরি হচ্ছে। এর প্রভাব বিশ্ব রাজনীতিতে গভীর ছাপ ফেলবে বলে বিশ্লেষকরা মনে করছেন...",
      categories: {
        create: [
          { category: { connect: { name: "আন্তর্জাতিক" } } },
          { category: { connect: { name: "স্বাস্থ্য ও চিকিৎসা" } } },
        ],
      },
      mediaId: mediaEntries[10].id,
      status: NewsStatus.PUBLISHED,
    },
    {
      title: "জলবায়ু পরিবর্তন নিয়ে আন্তর্জাতিক সম্মেলন",
      slug: "internation2al-conference-on-climate-change",
      content:
        "জলবায়ু পরিবর্তন মোকাবেলায় নতুন আন্তর্জাতিক সম্মেলন শুরু হচ্ছে। বিশ্বের বিভিন্ন দেশের নেতারা এতে অংশ নিচ্ছেন...",
      categories: {
        create: [
          { category: { connect: { name: "আন্তর্জাতিক" } } },
          { category: { connect: { name: "স্বাস্থ্য ও চিকিৎসা" } } },
        ],
      },
      mediaId: mediaEntries[0].id,
      status: NewsStatus.PUBLISHED,
    },
    // Business & Economy
    {
      title: "অর্থনীতিতে নতুন মাইলফলক",
      slug: "new-milestone-in-econ3omy",
      content:
        "বাংলাদেশের অর্থনীতি নতুন মাইলফলক অর্জন করেছে। রপ্তানি আয় ও রেমিট্যান্স প্রবাহ বৃদ্ধি পেয়েছে...",
      categories: {
        create: [
          { category: { connect: { name: "ব্যবসা ও অর্থনীতি" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
      mediaId: mediaEntries[11].id,
      status: NewsStatus.PUBLISHED,
    },
    {
      title: "শেয়ার বাজারে নতুন বিনিয়োগ",
      slug: "new-investment-i3n-stock-market",
      content:
        "দেশের শেয়ার বাজারে বড় ধরনের বিনিয়োগ আসছে। এতে বাজারে নতুন গতি আসবে বলে আশা করা হচ্ছে...",
      categories: {
        create: [{ category: { connect: { name: "ব্যবসা ও অর্থনীতি" } } }],
      },
      mediaId: mediaEntries[3].id,
      status: NewsStatus.PUBLISHED,
    },
    // Technology News
    {
      title: "নতুন প্রযুক্তির উদ্ভাবন",
      slug: "new-technology-innovation23",
      content:
        "বাংলাদেশি গবেষকরা একটি নতুন প্রযুক্তি উদ্ভাবন করেছেন। এই প্রযুক্তি দেশের ডিজিটাল অগ্রগতিতে নতুন মাত্রা যোগ করবে...",
      categories: {
        create: [
          { category: { connect: { name: "প্রযুক্তি" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
      mediaId: mediaEntries[0].id,
      status: NewsStatus.PUBLISHED,
    },
    // Health & Medicine
    {
      title: "স্বাস্থ্যসেবায় নতুন পদক্ষেপ",
      slug: "new-initiative-in-healthcare11",
      content:
        "দেশের স্বাস্থ্যসেবা খাতে নতুন উদ্যোগ নেওয়া হয়েছে। এর ফলে গ্রামীণ জনগোষ্ঠী উন্নত চিকিৎসা সেবা পাবে...",
      categories: {
        create: [
          { category: { connect: { name: "প্রযুক্তি" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
      mediaId: mediaEntries[1].id,
      status: NewsStatus.PUBLISHED,
    },
    // Education
    {
      title: "শিক্ষাব্যবস্থায় ডিজিটাল পরিবর্তন",
      slug: "digital-transformation-in-education3",
      content:
        "দেশের শিক্ষাব্যবস্থায় ডিজিটাল পরিবর্তন আসছে। অনলাইন শিক্ষা পদ্ধতি আরও সমৃদ্ধ হচ্ছে...",
      categories: {
        create: [
          { category: { connect: { name: "শিক্ষা" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
      mediaId: mediaEntries[2].id,
      status: NewsStatus.PUBLISHED,
    },
    // Environment & Climate
    {
      title: "পরিবেশ সংরক্ষণে নতুন প্রকল্প",
      slug: "new-project-in-environmental-conservation4",
      content:
        "পরিবেশ সংরক্ষণে সরকার নতুন প্রকল্প হাতে নিয়েছে। এই প্রকল্পের মাধ্যমে বনায়ন ও জীববৈচিত্র্য রক্ষা করা হবে...",
      categories: {
        create: [
          { category: { connect: { name: "পরিবেশ ও জলবায়ু" } } },
          { category: { connect: { name: "বাংলাদেশ" } } },
        ],
      },
      mediaId: mediaEntries[3].id,
      status: NewsStatus.PUBLISHED,
    },
    // Social Issues
    {
      title: "নারী উন্নয়নে নতুন কর্মসূচি",
      slug: "new-program-for-women-development3",
      content:
        "নারী উন্নয়নে সরকার নতুন কর্মসূচি গ্রহণ করেছে। এর মাধ্যমে নারীদের আর্থ-সামাজিক উন্নয়ন ত্বরান্বিত হবে...",
      categories: {
        create: [{ category: { connect: { name: "সামাজিক বিষয়" } } }],
      },
      mediaId: mediaEntries[4].id,
      status: NewsStatus.PUBLISHED,
    },
    // Breaking News
    {
      title: "জরুরি: বড় ধরনের শিল্প চুক্তি স্বাক্ষর",
      slug: "breaking-major-industrial-agreement-signed2",
      content:
        "দেশের ইতিহাসে সবচেয়ে বড় শিল্প চুক্তি স্বাক্ষরিত হলো। এর ফলে হাজার হাজার কর্মসংস্থান সৃষ্টি হবে...",
      categories: {
        create: [{ category: { connect: { name: "প্রযুক্তি" } } }],
      },
      mediaId: mediaEntries[5].id,
      status: NewsStatus.PUBLISHED,
    },
    // Science
    {
      title: "বাংলাদেশি বিজ্ঞানীদের নতুন আবিষ্কার",
      slug: "new-discovery-by-bangladeshi-scientists",
      content:
        "বাংলাদেশি বিজ্ঞানীরা একটি নতুন জীবাণু আবিষ্কার করেছেন। এই আবিষ্কার চিকিৎসা বিজ্ঞানে নতুন সম্ভাবনার দ্বার খুলবে...",
      categories: {
        create: [{ category: { connect: { name: "বিজ্ঞান" } } }],
      },
      mediaId: mediaEntries[6].id,
      status: NewsStatus.PUBLISHED,
    },
  ];

  // Create all news entries in a transaction
  await prisma.$transaction(
    newsData.map((data) => prisma.news.create({ data }))
  );
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
