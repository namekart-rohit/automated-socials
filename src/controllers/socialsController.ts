import { Request, Response } from "express";
import asyncHandler from "../helpers/asyncHandler";
import { getSocialMediaResults } from "../service/socials/socialsFetcher";
import { LeadSocialsDetails } from "../types/socials.t";
import getFacebookData from "../service/socials/facebookFetcher";
import getInstagramData from "../service/socials/instagramFetcher";
import getLinkedinData from "../service/socials/linkedinFetcher";
import getTwitterData from "../service/socials/twitterFetcher";

export const getLeadSocials = asyncHandler(
  async (req: Request, res: Response<LeadSocialsDetails>) => {
    const { query } = req.body;
    const socialMediaResults = await getSocialMediaResults(query);

    const leadSocials = {
      linkedin: socialMediaResults.linkedin,
      facebook: socialMediaResults.facebook,
      instagram: socialMediaResults.instagram,
      twitter: socialMediaResults.twitter,
    };

    const finalSocialDetails: LeadSocialsDetails = {
      linkedin: null,
      facebook: null,
      instagram: null,
      twitter: null,
    };

    // Facebook
    if (leadSocials.facebook) {
      const facebookData = await getFacebookData(leadSocials.facebook);
      finalSocialDetails.facebook = {
        profileUrl: leadSocials.facebook,
        likes: facebookData?.likes ?? null,
        followers: facebookData?.followers ?? null,
      };
    }

    // LinkedIn
    if (leadSocials.linkedin) {
      const linkedinData = await getLinkedinData(leadSocials.linkedin);
      finalSocialDetails.linkedin = {
        profileUrl: leadSocials.linkedin,
        followers: linkedinData.followers,
        employees: linkedinData.employees,
      };
    }

    // Instagram
    if (leadSocials.instagram) {
      const instagramData = await getInstagramData(leadSocials.instagram);
      finalSocialDetails.instagram = {
        profileUrl: leadSocials.instagram,
        followers: instagramData.followers,
        followings: instagramData.following,
        posts: instagramData.posts,
      };
    }

    // Twitter
    if (leadSocials.twitter) {
      const twitterData = await getTwitterData(leadSocials.twitter);
      finalSocialDetails.twitter = {
        profileUrl: leadSocials.twitter,
        followings: twitterData?.following ?? null,
        followers: twitterData?.followers ?? null,
      };
    }

    res.json(finalSocialDetails);
  }
);
