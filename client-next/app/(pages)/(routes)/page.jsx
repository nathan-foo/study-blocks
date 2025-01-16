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
    <div className="justify-center">
      <div className="hero-section relative flex flex-col top-[130px] md:top-[150px] px-12">
        <div className="font-bold text-4xl md:text-5xl text-center leading-normal">
          School is stressful.
        </div>
        <div className="flex items-center justify-center md:px-32">
          <p className="text-center md:text-lg pt-6 w-[80%]">
            Don't waste time worrying about what to study. Let us do the work, so you can focus on learning what matters.
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
      <div className="relative top-[130px] md:top-[150px]">
        <div className="h-[740px] md:h-[540px] bg-white relative flex flex-col md:flex-row items-center md:items-start justify-center text-center md:text-start gap-8 md:gap-12 lg:gap-16">
          <div className="flex flex-col items-start justify-center">
            <div className="md:pt-[160px] text-3xl font-bold w-[300px] md:w-[320px] lg:w-[440px]">
              What is a block?
            </div>
            <div className="md:text-lg mt-8 w-[300px] md:w-[320px] lg:w-[420px]">
              A block is your personalized study kit for any subject! Blocks are made in seconds and can cover any topic you choose.
            </div>
          </div>
          <div className="flex flex-col items-start justify-center md:pt-[82px] w-[300px] md:w-[360px]">
            <img src='/images/loading.gif' />
          </div>
        </div>
      </div>
      <div className="relative top-[130px] md:top-[150px]">
        <div className="h-[740px] md:h-[540px] bg-slate-50 relative flex flex-col md:flex-row items-center md:items-start justify-center text-center md:text-start gap-8 md:gap-12 lg:gap-16">
          <div className="flex flex-col items-start justify-center md:order-1 order-2 md:pt-[82px] w-[300px] md:w-[360px]">
            <img src='/images/loading.gif' />
          </div>
          <div className="flex flex-col items-start justify-center md:order-2 order-1">
            <div className="md:pt-[160px] text-3xl font-bold w-[300px] md:w-[320px] lg:w-[440px]">
              What's in a block?
            </div>
            <div className="md:text-lg mt-8 w-[300px] md:w-[320px] lg:w-[420px]">
              Each block contains a course overview with chapters, flashcards for easy memorization, and live quiz games to play with your friends.
            </div>
          </div>
        </div>
      </div>
      <div className="relative top-[130px] md:top-[150px]">
        <div className="h-[740px] md:h-[540px] bg-white relative flex flex-col md:flex-row items-center md:items-start justify-center text-center md:text-start gap-8 md:gap-12 lg:gap-16">
          <div className="flex flex-col items-start justify-center">
            <div className="md:pt-[160px] text-3xl font-bold w-[300px] md:w-[320px] lg:w-[440px]">
              How do I make a block?
            </div>
            <div className="md:text-lg mt-8 w-[300px] md:w-[320px] lg:w-[420px]">
              It's easy! Simply enter a topic or upload a pdf of notes, and we'll generate custom review materials just for you.
            </div>
          </div>
          <div className="flex flex-col items-start justify-center md:pt-[82px] w-[300px] md:w-[360px]">
            <img src='/images/loading.gif' />
          </div>
        </div>
      </div>
    </div>
  );
}