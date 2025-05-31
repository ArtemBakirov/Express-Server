import express from "express";
import { QuotesController } from "../controllers/Quotes.controller";

const router = express.Router();

router.get("/getQuote", QuotesController.getQuoteFromApi);


export default router;
