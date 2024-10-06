import { Url } from "@/Models/url";

export interface apiResponse{
    success: boolean;
    message: string;
    url? : Array<Url>;
}