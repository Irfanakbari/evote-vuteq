// pages/vote.js

'use client'
import {useEffect, useState} from "react";
import NominationCard from "@/app/vote/nomination_card";
import {useRouter} from "next/navigation";
import {getCookie} from "cookies-next";

export default function VotePage() {
    const [nominations, setNominations] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [userSelected, setUserSelected] = useState<Record<number, string>>({}); // Tipe data Record<string, string> untuk userSelected
    const router = useRouter()
    useEffect(() => {
        const isVote = getCookie('vuteq-vote');
        if (isVote) {
           router.replace('/')
        }
        const fetchData = async () => {
            try {
                const response = await fetch('https://vote.vuteq.co.id/api/fe/nominations');
                if (response.ok) {
                    const data = await response.json();
                    setNominations(data.data);
                } else {
                    console.error('Gagal memuat data nominasi');
                }
            } catch (error) {
                console.error('Terjadi kesalahan:', error);
            }
        };

        fetchData();
    }, []);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = () => {
        if (!isChecked) {
            alert("Anda harus menyetujui syarat dan ketentuan.");
            return;
        }

        // Panggil fungsi postVote() di sini untuk mengirim data vote ke server
        postVote();
    };
// pages/vote.js
    const isAllNominationsFilled = () => {
        nominations.map((nomination:any) => {
            if (!userSelected[nomination.NominationID]) {
                return false;
            }
        })
        return true;
    };

    const postVote = async () => {
        try {
            if (!isChecked) {
                alert("Anda harus menyetujui syarat dan ketentuan.");
                return;
            }

            if (!isAllNominationsFilled()) {
                alert("Anda harus mengisi semua nominasi.");
                return;
            }
            const response = await fetch('https://vote.vuteq.co.id/api/fe/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userSelected) // Mengirim data pemilihan kandidat
            });

            if (response.ok) {
                alert("Vote berhasil dikirim!");
                // setCookie('vuteq-vote', true)
                // Reset state, misalnya nominations atau isChecked jika diperlukan
                setTimeout(() => {
                    router.replace('/');
                }, 2000); // Tunda selama 2 detik (2000 milidetik)
            } else {
                alert("Gagal mengirim vote. Silakan coba lagi.");
            }
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            alert("Gagal mengirim vote. Terjadi kesalahan.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Anniversary Awarding</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    nominations.map((nomination: any) => (
                        <NominationCard
                            key={nomination.NominationID}
                            nomination={nomination}
                            onchange={(nominationId: number, candidateId: string) => {
                                setUserSelected((prevUserSelected) => ({
                                    ...prevUserSelected,
                                    [nominationId]: candidateId
                                }));
                            }}
                        />
                    ))
                }

            </div>
            <div className="mt-8 flex items-center">
                <input type="checkbox" className="mr-2" checked={isChecked} onChange={handleCheckboxChange}/>
                <p className="text-gray-600 text-sm">Saya menyetujui syarat dan ketentuan</p>
            </div>
            <button
                className={`py-2 px-4 rounded mt-4 ${
                    Object.keys(userSelected).length !== nominations.length
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-700 text-white hover:text-white"
                }`}
                onClick={handleSubmit}
                disabled={Object.keys(userSelected).length !== nominations.length}
            >
                {Object.keys(userSelected).length !== nominations.length ? "Isi Semua Nominasi" : "Submit"}
            </button>
        </div>
    );
}
