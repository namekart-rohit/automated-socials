import axios from "axios";
import * as cheerio from "cheerio";

async function fetchInstagramData(url: string): Promise<{
  followers: number | null;
  following: number | null;
  posts: number | null;
}> {
  try {
    const response = await axios.get(url);
    let html: string = response.data;

    // Remove commas from the entire HTML content
    html = html.replace(/,/g, "");

    // Load the cleaned HTML into Cheerio
    const $ = cheerio.load(html);

    // Extract the meta tag content
    const metaContent = $('meta[name="description"]').attr("content");

    if (metaContent) {
      // Parse the meta content to extract followers, following, and posts
      const matches = metaContent.match(/(\d+\.?\d*[KMB]?)/g);
      if (matches) {
        const [followers, following, posts] = matches.map((value) => {
          // Convert to number
          if (value.toLowerCase().includes("k"))
            return parseFloat(value) * 1000;
          if (value.toLowerCase().includes("m"))
            return parseFloat(value) * 1000000;
          if (value.toLowerCase().includes("b"))
            return parseFloat(value) * 1000000000;
          return parseInt(value);
        });

        return { followers, following, posts };
      }
    }
    return { followers: null, following: null, posts: null };
  } catch (error) {
    console.error("Error fetching Instagram stats:", error);
    return { followers: null, following: null, posts: null };
  }
}

export default fetchInstagramData;
