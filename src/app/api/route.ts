import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
    const prisma = new PrismaClient()
    await prisma.candidate.deleteMany()
    const candidate = await prisma.candidate.findMany()
    const data = {
       status: 200,
       message: 'Hello World',
       data: candidate,
   }
   return NextResponse.json(data)
}