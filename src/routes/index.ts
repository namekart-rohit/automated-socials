import express from "express";
import socials from "./socialsRouter";

const router = express.Router();

router.use("/socials", socials);

export default router;
