import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {z} from 'zod'

const schema = z.object({
    name: z.string(),
    description: z.string(),
})
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {
    const prisma = new PrismaClient()
    const nominations = await prisma.nomination.findMany({
        include: {
            candidates: true,
        },
    })
    const data = {
       status: 200,
       data: nominations,
   }
   return NextResponse.json(data)
}
