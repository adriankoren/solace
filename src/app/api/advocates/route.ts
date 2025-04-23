import { NextRequest } from "next/server";
import db, { DbType } from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { ilike, or } from "drizzle-orm";

export async function GET(req: NextRequest) {
  // Uncomment this line to use a database

  
  const search = req.nextUrl.searchParams.get('search');
  const wildcard = `%${search}%`;
  
  const dbReq = db.select().from(advocates);

  // there is no easy way to query specialites -- I would suggest putting them in another table
  // but that's outside of the scope for now.
  const dbReqWithWhere = 
  (search ?? "").length > 0 ? 
    dbReq.where(
      or(
        ilike(advocates.firstName, wildcard),
        ilike(advocates.lastName, wildcard),
        ilike(advocates.city, wildcard)
        // can add more fields here...
      )
    ) :
    dbReq;

  const data = await dbReqWithWhere;

  return Response.json({ data });
}
