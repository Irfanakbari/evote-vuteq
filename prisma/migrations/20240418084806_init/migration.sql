-- CreateTable
CREATE TABLE "Candidate" (
    "candidateID" TEXT NOT NULL PRIMARY KEY,
    "candidateName" TEXT NOT NULL,
    "candidatePicture" TEXT NOT NULL,
    "nominationNominationID" INTEGER,
    CONSTRAINT "Candidate_nominationNominationID_fkey" FOREIGN KEY ("nominationNominationID") REFERENCES "Nomination" ("NominationID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Nomination" (
    "NominationID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nominationName" TEXT NOT NULL,
    "nominationDescription" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Voter" (
    "voterID" TEXT NOT NULL PRIMARY KEY,
    "voterName" TEXT NOT NULL,
    "hasVote" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Vote" (
    "voteID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "voterVoterID" TEXT NOT NULL,
    "nominationNominationID" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "candidateCandidateID" TEXT NOT NULL,
    CONSTRAINT "Vote_voterVoterID_fkey" FOREIGN KEY ("voterVoterID") REFERENCES "Voter" ("voterID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_nominationNominationID_fkey" FOREIGN KEY ("nominationNominationID") REFERENCES "Nomination" ("NominationID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_candidateCandidateID_fkey" FOREIGN KEY ("candidateCandidateID") REFERENCES "Candidate" ("candidateID") ON DELETE RESTRICT ON UPDATE CASCADE
);
