import { connectDB } from "@/lib/dbConnect";
import UrlModel from "@/Models/url";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";

const isValidUrl = (url: any) => {
  const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
  return regex.test(url);
};

const normalizeUrl = (url: any) => {
  // Check if the URL already has a protocol
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
};
export async function POST(req: NextRequest) {
  connectDB();

  let { originalUrl } = await req.json();
  originalUrl = normalizeUrl(originalUrl);

  if (!isValidUrl(originalUrl)) {
    return Response.json(
      {
        message: "Invalid URL",
        success: false,
      },
      {
        status: 400, // Bad request
      }
    );
  }

  try {
    const url = await UrlModel.findOne({ originalUrl });

    if (url) {
      return Response.json(
        {
          message: "Url already exists",
          success: false,
        },
        {
          status: 404,
        }
      );
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
    );
  } catch (error: any) {
    console.log("h222");

    return Response.json(
      {
        message: error,
        success: false,
      },
      {
        status: 404,
      }
    );
  }
}
