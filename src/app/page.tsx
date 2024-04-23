'use client'
import Image from "next/image";
import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import {useRouter} from "next/navigation";

export default function Home() {
    const [isVote, setVote] = useState(false);
    const router = useRouter();
    useEffect(()=>{
        const isVote = getCookie('vuteq-vote');
        if (!isVote) {
            setVote(false);
        } else {
            setVote(true);
        }
    },[])
    return (
        <div className="flex flex-col h-screen justify-between bg-cover bg-center" style={{backgroundImage: "url('/bg.jpg')"}}>
            <div className="flex flex-col h-full justify-center items-center bg-black bg-opacity-60">
                <header className="p-5">
                    <Image src={'/logo.png'} width={300} height={300} alt={'logo'}/>
                </header>
                <main className="flex flex-col items-center justify-center p-24">
                    {
                        !isVote && (<div
                        onClick={() => router.push('/vote')}
                            className={'flex justify-center items-center bg-green-500 py-4 px-8 text-xl font-semibold text-white rounded-xl hover:bg-green-700 hover:cursor-pointer'}
                        >
                            Mulai Voting
                        </div>)
                    }
                    {isVote && (
                        <div className="mt-4 text-red-500">
                            Anda telah melakukan voting sebelumnya.
                        </div>
                    )}
                </main>
            </div>
            <footer className="flex justify-center items-center p-4 bg-gray-200">
                <p className="text-sm text-gray-600">&copy; PT. Vuteq Indonesia {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
