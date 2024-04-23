/*
  Warnings:

  - You are about to drop the `Voter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `voterVoterID` on the `Vote` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Voter";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vote" (
    "voteID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nominationNominationID" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "candidateCandidateID" TEXT NOT NULL,
    CONSTRAINT "Vote_nominationNominationID_fkey" FOREIGN KEY ("nominationNominationID") REFERENCES "Nomination" ("NominationID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_candidateCandidateID_fkey" FOREIGN KEY ("candidateCandidateID") REFERENCES "Candidate" ("candidateID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vote" ("candidateCandidateID", "nominationNominationID", "timestamp", "voteID") SELECT "candidateCandidateID", "nominationNominationID", "timestamp", "voteID" FROM "Vote";
DROP TABLE "Vote";
ALTER TABLE "new_Vote" RENAME TO "Vote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
