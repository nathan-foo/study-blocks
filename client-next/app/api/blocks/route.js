import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Block from "@/models/block";
import { courseOutline } from "@/models/course";
import { quizOutline } from "@/models/quiz";
import { flashcardOutline } from "@/models/flashcards";

export async function POST(request) {
    const { blockId, createdBy, topic, difficulty } = await request.json();
    
    const COURSE_PROMPT = `Generate study material for a ${topic} review. The level of difficulty will be ${difficulty}. Write a summary of the course, a list of chapters along with a summary for each chapter, and a topic list in each chapter. For each topic, generate relevant notes. Write all results in JSON format. Copy the following structure:\n{\ncourseTitle: string,\nsummary: string,\nchapters:\n[\n{\nchapterTitle: string,\nsummary: string,\ntopics:\n[\n{\ntopic: string,\nnotes: string,\n]\n}\n]\n}`;

    const courseResponse = await courseOutline.sendMessage(COURSE_PROMPT);
    const outline = JSON.parse(courseResponse.response.text());

    await connectDB();
    await Block.create({ blockId, createdBy, topic, difficulty, outline: outline });
    return NextResponse.json({ message: "Block Created" }, { status: 201 });
}

export async function GET(request) {
    const createdBy = request.nextUrl.searchParams.get("createdBy");

    const query = {};
    if (createdBy) query.createdBy = createdBy;

    await connectDB();

    const blocks = await Block.find(query);
    return NextResponse.json({ blocks });
}

export async function PATCH(request) {
    const { topic, difficulty } = await request.json();
    const blockId = request.nextUrl.searchParams.get("blockId");

    const QUIZ_PROMPT = `Generate quiz questions and answers for a ${topic} review. The level of difficulty will be ${difficulty}. Each question will have four answer choices with one correct answer. Write all results in JSON format. Copy the following structure:\nquestions:\n[\n{\nquestion: string,\nanswers:\n[\n{\nanswer: string,\ncorrect: boolean,\n}\n]\n}\n]`;

    const quizResponse = await quizOutline.sendMessage(QUIZ_PROMPT);
    const quiz = JSON.parse(quizResponse.response.text());

    const FLASHCARD_PROMPT = `Generate study flashcards for a ${topic} review. The level of difficulty will be ${difficulty}. Each flashcard will have a question and an answer. Write all results in JSON format. Copy the following structure:\nset:\n[\n{\nquestion: string,\nanswer: string,\n}\n]`;

    const flashcardResponse = await flashcardOutline.sendMessage(FLASHCARD_PROMPT);
    const flashcards = JSON.parse(flashcardResponse.response.text());

    await connectDB();
    await Block.findOneAndUpdate({ blockId: blockId }, { flashcards: flashcards, quiz: quiz });
    return NextResponse.json({ message: "Block Updated" }, { status: 200 });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();
    await Block.findByIdAndDelete(id);
    return NextResponse.json({ message: "Block Deleted" }, { status: 200 });
}