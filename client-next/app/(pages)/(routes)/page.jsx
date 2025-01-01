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
    <div className="pt-16">
      <div className="hero-section relative bg-[url('/images/home-bg.svg')] bg-center h-screen">
        <div className="absolute w-[75%] lg:w-[65%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="font-black text-4xl md:text-6xl text-center leading-tight">
            Study Blocks!
          </p>
          <p className="text-center pt-6 md:text-lg">
            And here is some smaller bottom text.
          </p>
        </div>
      </div>
      <div className="body-section relative size-full px-8 md:px-16 lg:px-32">
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
          <h2 className="font-black text-3xl md:text-4xl">
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