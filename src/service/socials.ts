import puppeteer from "puppeteer";
import { SOCIAL_PLATFORMS } from "../constants/socials";
import { MediaResult } from "../types/socials.t";

const getFirstLink = async (query: string, platform: string) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    const searchUrl = `https://www.bing.com/search?q=site:${platform}+${encodeURIComponent(
      query
    )}`;
    await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const firstLink = await page.evaluate(() => {
      const linkElement = document.querySelector(
        "a[href^='http']"
      ) as HTMLAnchorElement;
      return linkElement ? linkElement.href : null;
    });

    return firstLink || "No result found";
  } catch (error) {
    console.error(`Error scraping ${platform}:`, error);
    throw error;
  } finally {
    await browser.close();
  }
};

const getSocialMediaResults = async (query: string): Promise<MediaResult> => {
  try {
    const results: MediaResult = {
      linkedin: null,
      facebook: null,
      instagram: null,
      twitter: null,
    };

    const searches = SOCIAL_PLATFORMS.map(async (platform) => {
      const platformKey = platform.split(".")[0];
      results[platformKey as keyof MediaResult] = await getFirstLink(
        query,
        platform
      );
    });

    await Promise.all(searches);
    return results;
  } catch (error) {
    console.error("Error in social media search:", error);
    throw error;
  }
};

const sanitizeSocialMediaResults = (results: MediaResult) => {
  // LinkedIn
  if (results.linkedin && results.linkedin.includes("linkedin.com/company")) {
    results.linkedin = results.linkedin.split("/").splice(0, 5).join("/");
  } else {
    results.linkedin = null;
  }

  // Facebook
  if (results.facebook && results.facebook.includes("facebook.com/")) {
    results.facebook = results.facebook.split("/").splice(0, 4).join("/");
  } else {
    results.facebook = null;
  }

  // Instagram
  if (results.instagram && results.instagram.includes("instagram.com/")) {
    results.instagram = results.instagram.split("/").splice(0, 4).join("/");
  } else {
    results.instagram = null;
  }

  // Twitter
  if (results.twitter && results.twitter.includes("twitter.com/")) {
    results.twitter = results.twitter.split("/").splice(0, 4).join("/");
  } else {
    results.twitter = null;
  }

  return results;
};

export { getSocialMediaResults, sanitizeSocialMediaResults };
