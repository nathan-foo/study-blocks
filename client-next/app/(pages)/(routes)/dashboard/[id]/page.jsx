"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BlockPage = () => {
    const [linkId, setLinkId] = useState(null);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const setId = async () => {
            if (!params) return;
            const { id } = await params;
            setLinkId(id);
        }
        setId();
    }, []);

    const handleDelete = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blocks?id=${linkId}`;

        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            router.push('/dashboard');
            toast.success('Block deleted');
        } catch (error) {
            toast.error('Something went wrong');
            throw new Error(`Failed to get block: ${error}`);
        }
    }

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
                            <Button variant='destructive' onClick={handleDelete}>Delete</Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BlockPage