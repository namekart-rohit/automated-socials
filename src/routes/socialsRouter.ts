import express from "express";
import { getLeadSocials } from "../controllers/socialsController";
import validateSocialQuery from "../middleware/validateSocialQuery";

const router = express.Router();

router.post("/", validateSocialQuery, getLeadSocials);

export default router;
