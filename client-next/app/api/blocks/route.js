import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Block from "@/models/block";
import { courseOutline } from "@/models/gemini";

export async function POST(request) {
    const { blockId, createdBy, topic, difficulty } = await request.json();
    const AI_PROMPT = `Generate study material for a ${topic} review. The level of difficulty will be ${difficulty}. Write a summary of each course, a list of chapters along with a summary for each chapter, and a topic list in each chapter. For each topic, generate relevant notes. Write all results in JSON format. Copy the following structure:\n{\ncourseTitle: string,\nsummary: string,\nchapters:\n[\n{\nchapterTitle: string,\nsummary: string,\ntopics:\n[\n{\ntopic: string,\nnotes: string,\n]\n}\n]\n}`;

    const geminiResponse = await courseOutline.sendMessage(AI_PROMPT);
    const outline = JSON.parse(geminiResponse.response.text());

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

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();
    await Block.findByIdAndDelete(id);
    return NextResponse.json({ message: "Block Deleted" }, { status: 200 });
}