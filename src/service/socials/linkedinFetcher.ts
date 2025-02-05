import puppeteer from "puppeteer";
import Logger from "../../core/Logger";

async function getLinkedinData(url: string) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    // Extract follower count and employee count
    const data = await page.evaluate(() => {
      const parseNumber = (text: string | null): number | null => {
        if (!text) return null;
        const number = parseInt(text.replace(/[^0-9]/g, ""), 10);
        return isNaN(number) ? null : number;
      };

      const result: { followers: number | null; employees: number | null } = {
        followers: null,
        employees: null,
      };

      // Extract the follower count
      const followersElement = document.querySelector(
        "h3.top-card-layout__first-subline"
      ) as HTMLElement;
      const followersText = followersElement
        ? followersElement.innerText
        : null;
      const followersMatch = followersText?.match(
        /(\d+(?:,\d+)*)\s+followers/i
      );
      result.followers = parseNumber(followersMatch ? followersMatch[1] : null);

      // Extract the employee count
      const employeeElement = document.querySelector(
        'div[data-test-id="about-us__size"] dd'
      ) as HTMLElement;
      result.employees = parseNumber(
        employeeElement ? employeeElement.innerText.trim() : null
      );

      return result;
    });

    await browser.close();
    return data ?? { followers: null, employees: null };
  } catch (error) {
    Logger.error("An error occurred:", error);
    return { followers: null, employees: null };
  }
}

export default getLinkedinData;
