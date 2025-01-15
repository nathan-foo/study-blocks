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
      <div className="hero-section bg-slate-50 relative flex justify-center h-screen">
        <div className="relative flex flex-col top-[130px] md:top-[150px] px-12 md:px-32">
          <div className="font-bold text-4xl md:text-5xl text-center leading-normal">
            Exams are stressful.
          </div>
          <div className="flex items-center justify-center">
            <p className="text-center md:text-lg pt-6 lg:px-32 w-[80%]">
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
        </div>
      </div>
      <div className="body-section bg-pink-primary relative size-full px-8 md:px-16 lg:px-32">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="font-black text-3xl md:text-4xl">
            What is a block?
          </h2>
          <p className="pt-6 w-full md:text-lg md:px-16 lg:px-32">
            A block is your personalized study kit for any subject. Each block includes a comprehensive subject review, flashcards for efficient memorization, and interactive, real-time multiplayer quizzes, perfect for practicing with your friends.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center py-12 md:pt-20 md:pb-8">
          <InfoCard
            icon={<HiBookOpen />}
            title='Reviews'
            description='Guided lessons to absorb subject matter.'
          />
          <InfoCard
            icon={<HiCollection />}
            title='Flashcards'
            description='Turn newly gained concepts into memories.'
          />
          <InfoCard
            icon={<HiMiniTrophy />}
            title='Quizzes'
            description='Play with friends to make learning fun!'
          />
        </div>
        <div className="flex items-center justify-center">
          <p className="text-center pt-6 w-full md:text-lg md:px-16 lg:px-32">
            Whether you're studying for exams, prepping for an interview, or learning a new web framework, Study Blocks has you covered. And the best part? All of this is generated instantly with the power of AI.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center text-center py-16">
          <h2 className="font-bold text-3xl md:text-4xl">
            Let's get started.
          </h2>
          <div className="flex items-center justify-center gap-8 pt-8">
            {user ? (
              <div>
                <Link href='/dashboard'>
                  <Button size='lg' variant='outline'>
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Link href='sign-in'>
                  <Button size='lg' variant='outline'>
                    Sign In
                  </Button>
                </Link>
                <Link href='sign-up'>
                  <Button size='lg' variant='outline'>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}