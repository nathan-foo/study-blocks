"use client";

import Link from "next/link";
import InfoCard from "../_components/InfoCard";
import { HiBookOpen, HiCollection } from "react-icons/hi";
import { HiMiniTrophy } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <div className="hero-section justify-center">
        <div className="relative flex flex-col top-[130px] md:top-[150px] px-12">
          <div className="font-bold text-4xl md:text-5xl text-center leading-normal">
            Exams are stressful.
          </div>
          <div className="flex items-center justify-center md:px-32">
            <p className="text-center md:text-lg pt-6 w-[80%]">
              Don't waste time creating review material. Let us do the work, so you can focus on learning what matters.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 py-8">
            {user ? (
              <div>
                <Link href='/dashboard'>
                  <Button size='lg'>
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Link href='sign-in'>
                  <Button size='lg' variant='outline'>
                    Log in
                  </Button>
                </Link>
                <Link href='sign-up'>
                  <Button size='lg'>
                    Create account
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div>
            <div className="flex items-center justify-center gap-8 mt-8 mb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <InfoCard
                  icon={<HiBookOpen />}
                  title='Reviews'
                  description='Guided lessons to absorb subject matter.'
                  gradient={'from-blue-500 to-purple-500'}
                />
                <InfoCard
                  icon={<HiCollection />}
                  title='Flashcards'
                  description='Transfer newly gained concepts into memory.'
                  gradient={'from-orange-400 to-yellow-300'}
                />
                <InfoCard
                  icon={<HiMiniTrophy />} 
                  title='Quizzes'
                  description='Play live games with friends to make learning fun!'
                  gradient={'from-yellow-300 to-green-400'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}