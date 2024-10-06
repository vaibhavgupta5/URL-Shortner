import { connectDB } from "@/lib/dbConnect";
import UrlModel from "@/Models/url";
import { NextRequest } from "next/server";

export async function POST (req: NextRequest){
    connectDB();

    const {shortId
    } = await req.json();

    try {
        
        const url = await UrlModel.findOne({shortId
        });

        console.log(url)


        if(!url){
            return Response.json(
                {
                  message: "Invalid route",
                  success: false,
                },
                {
                  status: 404,
                }
              )
        }


        return Response.json(
            {
              message: "Route Found",
              success: true,
              url: url,
            },
            {
              status: 200,
            }
          )

    } catch (error) {

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