import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {z} from 'zod'

const schema = z.object({
    isOpen: z.boolean(),
})
export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {
    const prisma = new PrismaClient()
    const settings = await prisma.setting.findUnique({
        where: {
            id: 1
        }
    })
    const data = {
       status: 200,
       data: settings,
   }
   return NextResponse.json(data)
}

// export async function POST(request: NextRequest) {
//         const prisma = new PrismaClient()
//         const body = await request.json()
//         const parsed = schema.safeParse(body)
//         if (!parsed.success) {
//             const { errors } = parsed.error;
//
//             return NextResponse.json({
//                 error: { message: "Invalid request", errors },
//             });
//         }
//         const setting = await prisma.setting.create({
//             data: {
//                 id: 1,
//                 isOpen: parsed.data.isOpen
//             }
//         })
//         const data = {
//             status: 201,
//             message: setting
//         }
//         return NextResponse.json(data)
// }

export async function PUT(request: NextRequest) {
    const prisma = new PrismaClient()
    const body = await request.json()
        const parsed = schema.safeParse(body)
        if (!parsed.success) {
            const { errors } = parsed.error;

            return NextResponse.json({
                error: { message: "Invalid request", errors },
            });
        }
        const setting = await prisma.setting.update({
            where: {
                id: 1
            },
            data: {
                isOpen: parsed.data.isOpen
            }
        })
        const data = {
            status: 200,
            message: setting
        }
        return NextResponse.json(data)
}