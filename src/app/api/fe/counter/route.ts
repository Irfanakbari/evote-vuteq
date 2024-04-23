import {NextRequest, NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {
    const prisma = new PrismaClient()
    const nomination = await prisma.nomination.findMany({
        include: {
            candidates: {
                select: {
                    candidateID: true,
                    candidateName: true,
                    Vote: true
                }
            }
        },
        orderBy: {
            NominationID: 'asc'
        }
    });
    const countVote = await prisma.vote.count()
    // Calculate total votes for each candidate in each nomination
    // Calculate total votes for each candidate in each nomination
    const nominationsWithTotalVotes = nomination.map((nomination:any) => {
        const candidatesWithTotalVotes = nomination.candidates.map((candidate: any) => {
            const totalVotes = candidate.Vote.length;
            const { Vote, ...candidateWithoutVote } = candidate;
            return { ...candidateWithoutVote, totalVotes };
        });

        // Sort candidates within each nomination based on totalVotes in descending order
        const sortedCandidates = candidatesWithTotalVotes.sort((a: any, b: any) => b.totalVotes - a.totalVotes);

        return { ...nomination, candidates: sortedCandidates };
    });

    // Sort nominations based on the highest totalVotes among candidates
    const sortedNominations = nominationsWithTotalVotes.sort((a, b) => {
        const totalVotesA = a.candidates.reduce((total: any, candidate: any) => total + candidate.totalVotes, 0);
        const totalVotesB = b.candidates.reduce((total: any, candidate: any) => total + candidate.totalVotes, 0);
        return totalVotesB - totalVotesA;
    });


    const data = {
       status: 200,
        totalVotes: countVote / nomination.length,
       data: sortedNominations,
   }
   return NextResponse.json(data)
}
