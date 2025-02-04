import { Request, Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import {
  getSocialMediaResults,
  sanitizeSocialMediaResults,
} from "../service/socials";

export const getLeadSocials = asyncHandler(
  async (req: Request, res: Response) => {
    const { query } = req.body;
    const socialMediaResults = await getSocialMediaResults(query);

    // Sanitize the results
    const sanitizedResults = sanitizeSocialMediaResults(socialMediaResults);

    const leadSocials = {
      linkedin: sanitizedResults.linkedin,
      facebook: sanitizedResults.facebook,
      instagram: sanitizedResults.instagram,
      twitter: sanitizedResults.twitter,
    };

    res.json(leadSocials);
  }
);
