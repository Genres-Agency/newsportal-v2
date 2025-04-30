// Bengali date conversion and formatting utilities

export const daysInBangla = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

export const monthsInBangla = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export const numbersInBangla = [
  "০",
  "১",
  "২",
  "৩",
  "৪",
  "৫",
  "৬",
  "৭",
  "৮",
  "৯",
];

/**
 * Converts a number to Bengali numerals
 * @param number The number to convert
 * @returns The number in Bengali numerals
 */
export const convertToBanglaNumber = (number: number): string => {
  return number
    .toString()
    .split("")
    .map((digit) => numbersInBangla[parseInt(digit)])
    .join("");
};

/**
 * Gets the current date formatted in Bengali
 * @returns The current date in Bengali format
 */
export const getCurrentBanglaDate = (): string => {
  const date = new Date();
  const day = daysInBangla[date.getDay()];
  const month = monthsInBangla[date.getMonth()];
  const dateNumber = convertToBanglaNumber(date.getDate());
  const year = convertToBanglaNumber(date.getFullYear());

  return `${day}, ${dateNumber} ${month} ${year}`;
};
