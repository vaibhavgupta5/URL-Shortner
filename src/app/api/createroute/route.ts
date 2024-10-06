import { connectDB } from "@/lib/dbConnect";
import UrlModel from "@/Models/url";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

export async function POST (req: NextRequest){
    connectDB();

    

    const {originalUrl} = await req.json();

    try {
        
        const url = await UrlModel.findOne({originalUrl});

        if(url){
            console.log("h1")
            return Response.json(
                {
                  message: "Url already exists",
                  success: false,
                },
                {
                  status: 404,
                }
              )
        }


        const shortId = nanoid(4);

        

        const newUrl = new UrlModel({
            originalUrl,
            shortId: shortId,
            clickCount: 0,
        });


        await newUrl.save();

        return Response.json(
            {
              message: "Success Created",
              success: true,
              url: newUrl.shortId,
            },
            {
              status: 200,
            }
          )

    } catch (error) {
        console.log("h222")

        return Response.json(
            {
              message: error,
              success: false,

            },
            {
              status: 404,
            }
          )
    }
}