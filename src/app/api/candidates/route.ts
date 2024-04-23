import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {z} from 'zod'

const schema = z.object({
    name: z.string(),
    picture: z.string(),
    nomination_id: z.number()
})
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {
    const prisma = new PrismaClient()
    const candidates = await prisma.candidate.findMany()
    const data = {
       status: 200,
       data: candidates,
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
        const candidate = await prisma.candidate.create({
            data: {
                candidateName: parsed.data.name,
                candidatePicture: parsed.data.picture,
                nominationNominationID: parsed.data.nomination_id
            }
        })
        const data = {
            status: 201,
            message: candidate
        }
        return NextResponse.json(data)

}