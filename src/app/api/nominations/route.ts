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
    const nominations = await prisma.nomination.findMany()
    const data = {
       status: 200,
       data: nominations,
   }
   return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
        const prisma = new PrismaClient()
        const body = await request.json()
        const parsed = schema.safeParse(body)
        if (!parsed.success) {
            const { errors } = parsed.error;

            return NextResponse.json({
                error: { message: "Invalid request", errors },
            });
        }
        const nomination = await prisma.nomination.create({
            data: {
                nominationName: parsed.data.name,
                nominationDescription: parsed.data.description,
            }
        })
        const data = {
            status: 201,
            message: nomination
        }
        return NextResponse.json(data)

}