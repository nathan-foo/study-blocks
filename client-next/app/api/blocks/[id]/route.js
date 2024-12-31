import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Block from "@/models/block";

export async function PUT(request, { params }) {
    const { id } = await params;
    const {
        newCreatedBy: createdBy,
        newTopic: topic,
        newDifficulty: difficulty,
        newOutline: outline,
        newQuiz: quiz,
    } = await request.json();

    await connectDB();
    await Block.findByIdAndUpdate(id, { createdBy, topic, difficulty, outline, quiz });
    return NextResponse.json({ message: "Block Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = await params;
    await connectDB();
    const block = await Block.findOne({ _id: id });
    return NextResponse.json({ block }, { status: 200 });
}