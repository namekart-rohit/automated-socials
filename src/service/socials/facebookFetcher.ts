import puppeteer from "puppeteer";
import Logger from "../../core/Logger";

async function getFacebookData(url: string) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    // Extract likes and followers count
    const data = await page.evaluate(() => {
      const parseNumber = (text: string | null): number | null => {
        if (!text) return null;
        const numberText = text.replace(/,/g, "").toLowerCase();
        let multiplier = 1;

        if (numberText.includes("k")) {
          multiplier = 1000;
        } else if (numberText.includes("m")) {
          multiplier = 1000000;
        } else if (numberText.includes("b")) {
          multiplier = 1000000000;
        }

        const number = parseFloat(numberText.replace(/[kmb]/, ""));
        return isNaN(number) ? null : number * multiplier;
      };

      const result: { likes: number | null; followers: number | null } = {
        likes: null,
        followers: null,
      };

      // Extract the likes count
      const likesElement = document.querySelector(
        'a[href*="friends_likes"]'
      ) as HTMLElement;

      result.likes = parseNumber(
        likesElement ? likesElement.innerText.split(" ")[0].trim() : null
      );

      // Extract the followers count
      const followersElement = document.querySelector(
        'a[href*="followers"]'
      ) as HTMLElement;

      result.followers = parseNumber(
        followersElement
          ? followersElement.innerText.split(" ")[0].trim()
          : null
      );

      return result;
    });

    await browser.close();
    return data ?? { likes: null, followers: null };
  } catch (error) {
    Logger.error("An error occurred:", error);
    return { likes: null, followers: null };
  }
}

export default getFacebookData;
