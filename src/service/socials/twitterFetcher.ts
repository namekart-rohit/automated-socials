import puppeteer from "puppeteer";
import Logger from "../../core/Logger";

interface ProfileStats {
  followers: number | null;
  following: number | null;
}

async function fetchTwitterProfileStats(
  profileUrl: string
): Promise<ProfileStats> {
  profileUrl;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Set a realistic user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.goto(profileUrl, { waitUntil: "networkidle2" });

    // Add a delay to allow dynamic content to load
    await new Promise((resolve) => setTimeout(resolve, 6000));

    // Extract the followers and following count
    const stats = await page.evaluate(() => {
      const followersElement = document.querySelector(
        'a[href$="/verified_followers"] > span > span'
      );
      const followingElement = document.querySelector(
        'a[href$="/following"] > span > span'
      );

      const parseNumber = (text: string | null): number | null => {
        if (!text) return null;
        const number = text.replace(/,/g, "").toUpperCase();
        if (number.includes("K")) return parseFloat(number) * 1000;
        if (number.includes("M")) return parseFloat(number) * 1000000;
        if (number.includes("B")) return parseFloat(number) * 1000000000;
        return parseInt(number);
      };

      const followers = parseNumber(followersElement?.textContent ?? null);
      const following = parseNumber(followingElement?.textContent ?? null);

      return { followers, following };
    });

    return stats;
  } catch (error) {
    Logger.error("Error fetching Twitter profile stats:", error);
    return { followers: null, following: null };
  } finally {
    await browser.close();
  }
}

export default fetchTwitterProfileStats;
