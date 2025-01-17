"use client"

import DashboardIdCard from "@/app/(pages)/_components/DashboardIdCard";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiBookOpen, HiCollection } from "react-icons/hi";
import { HiMiniTrophy } from "react-icons/hi2";

const BlockPage = () => {
    const [linkId, setLinkId] = useState(null);
    const [block, setBlock] = useState(null);
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const setId = async () => {
            if (!params) return;
            const { id } = await params;
            setLinkId(id);

            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/blocks/${id}`;

            try {
                const response = await fetch(url, {
                    cache: 'no-store'
                });

                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const data = await response.json();
                setBlock(data.block);

                console.log(data.block)
            } catch (error) {
                throw new Error(`Failed to get block: ${error}`);
            }
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
            toast.success('Block deleted.');
        } catch (error) {
            toast.error('Something went wrong.');
            throw new Error(`Failed to get block: ${error}`);
        }
    }

    return (
        <div className="pt-16 px-12">
            <div className="pt-20 font-bold text-3xl md:text-4xl text-center">
                {block && (
                    <div>{block.outline.courseTitle}</div>
                )}
            </div>
            <div className='pt-16'>
                <div className='flex flex-col items-center justify-center text-center'>
                    {linkId && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <DashboardIdCard
                                title='Reviews'
                                description='Guided lessons to absorb subject matter.'
                                href={`/dashboard/${linkId}/review`}
                                icon={<HiBookOpen />}
                                gradient={'from-blue-500 to-purple-500'}
                            />
                            <DashboardIdCard
                                title='Flashcards'
                                description='Transfer newly gained concepts into memory.'
                                href={`/dashboard/${linkId}/flashcards`}
                                icon={<HiCollection />}
                                gradient={'from-orange-400 to-yellow-300'}
                            />
                            <DashboardIdCard
                                title='Quizzes'
                                description='Play live games with friends to make learning fun!'
                                href={`/dashboard/${linkId}/quiz`}
                                icon={<HiMiniTrophy />}
                                gradient={'from-yellow-300 to-green-400'}
                            />
                        </div>
                    )}
                    <Button variant='destructive' onClick={handleDelete} className='my-16'>Delete</Button>
                </div>
            </div>
        </div>
    )
}

export default BlockPage