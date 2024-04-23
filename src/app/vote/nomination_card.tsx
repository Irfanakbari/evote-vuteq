import Image from "next/image";
import React, {useState} from 'react';

interface NominationCardProps {
    nomination: {
        nominationName: string;
        NominationID: string;
        nominationDescription: string;
        candidates: any[];
    };
    onchange: any;
}

const NominationCard: React.FC<NominationCardProps> = ({ nomination, onchange }) => {
    const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

    const handleSelectCandidate = (candidateID: string) => {
        setSelectedCandidate(candidateID);
        onchange(nomination.NominationID, candidateID);
    };


    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <h2 className="text-xl font-semibold mb-2">{nomination.nominationName}</h2>
            <p className="text-gray-600 mb-4">{nomination.nominationDescription}</p>
            {nomination.candidates.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {nomination.candidates.map((candidate: any) => (
                        <div key={candidate.candidateID} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full overflow-hidden h-16 w-16">
                                    <Image src={candidate.candidatePicture} width={150} height={150} alt={candidate.candidateName} className="rounded-full" />
                                </div>
                                <p>{candidate.candidateName}</p>
                            </div>
                            <button
                                className={`text-white py-2 px-4 rounded-md text-sm ${selectedCandidate === candidate.candidateID ? 'bg-red-500' : 'bg-blue-500 hover:bg-blue-700'}`}
                                onClick={() => handleSelectCandidate(candidate.candidateID)}
                                disabled={selectedCandidate === candidate.candidateID}
                            >
                                {selectedCandidate === candidate.candidateID ? 'Dipilih' : 'Pilih'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">Tidak ada kandidat untuk nominasi ini.</p>
            )}
        </div>
    );
};

export default NominationCard;
