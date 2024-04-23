import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";
import {setCookie} from "cookies-next";

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()
    try {
        const res = new NextResponse();

        // Mendapatkan data dari body permintaan
        const body = await req.json();

        // Array untuk menyimpan entri vote
        const votes = [];

        // Mengiterasi setiap pasangan kunci-nilai dalam body
        for (const [nominationId, candidateId] of Object.entries(body)) {
            // Menambahkan entri vote ke dalam array
            votes.push({
                nominationNominationID: parseInt(nominationId), // Konversi nominationId menjadi integer jika diperlukan
                candidateCandidateID: String(candidateId) // Konversi candidateId menjadi string
            });
        }

        // Membuat entri vote menggunakan createMany
        const createdVotes = await prisma.vote.createMany({
            data: votes
        });

        // Mengembalikan respons dengan status 201 dan data vote yang baru dibuat

        setCookie('vuteq-vote', true, { res, req });
        return res
    } catch (error) {
        // Jika terjadi kesalahan, tangani dan kembalikan respons dengan status 500
        console.error('Terjadi kesalahan:', error);
        return new Response(JSON.stringify({ status: 500, message: 'Terjadi kesalahan dalam pengolahan data' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    } finally {
        // Tutup koneksi Prisma setelah selesai
        await prisma.$disconnect();
    }
}
