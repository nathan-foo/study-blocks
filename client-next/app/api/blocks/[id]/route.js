import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Block from "@/models/block";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newBlockId: blockId, newCreatedBy: createdBy, newTopic: topic, newDifficulty: difficulty, newOutline: outline } = await request.json();
    await connectDB();
    await Block.findByIdAndUpdate(id, { blockId, createdBy, topic, difficulty, outline });
    return NextResponse.json({ message: "Block Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectDB();
    const block = await Block.findOne({ _id: id });
    return NextResponse.json({ block }, { status: 200 });
}