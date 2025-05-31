import { Quote } from "../models/Quote.model";
import { Request, Response } from "express";
import axios from "axios";
import QuoteModel from "../models/Quote.model";

export class QuotesController{

    static async getQuoteFromApi(req: Request , res: Response) : Promise<void> {
        try{
            const response = await axios.get("https://zenquotes.io/api/random");
            const quote = response.data[0];
            await QuotesController.saveQuoteToDB(quote);
            res.json(quote);
        }   catch(e){
            console.log(e);
            try{
                const fallbackQuote = await QuoteModel.aggregate([{ $sample: { size: 1 } }]);
                console.log("fallback", fallbackQuote);
                res.json(fallbackQuote[0]);
            } catch(e){
                console.log("no fallback data available");
                res.json(null);
            }
        }
    }

    static async saveQuoteToDB(quote: Quote) : Promise<Quote | null>{
        try{
            const response = await QuoteModel.create(quote);
            console.log("quote from api saved to DB");
            return response;
        } catch(e){
            console.log("error happened", e.message);
            return null;
        }

    }
}

