"use client"

import Link from "next/link"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BlockPage = () => {
    const [linkId, setLinkId] = useState(null);
    const params = useParams();

    useEffect(() => {
        const setId = async () => {
            if (!params) return;
            const { id } = await params;
            setLinkId(id);
        }
        setId();
    }, []);

  return (
    <div className='pt-16'>
        <div className='pt-8 px-32'>
            <div className='flex items-center justify-between'>
                {linkId && (
                    <>
                        <Link href={`/dashboard/${linkId}/review`}>
                            Review
                        </Link>
                        <Link href={`/dashboard/${linkId}/flashcards`}>
                            Flashcards
                        </Link>
                        <Link href={`/dashboard/${linkId}/quiz`}>
                            Quiz
                        </Link>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default BlockPage