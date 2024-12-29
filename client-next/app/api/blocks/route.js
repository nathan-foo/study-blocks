import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Block from "@/models/block";

export async function POST(request) {
    const { blockId, createdBy, topic, difficulty } = await request.json();
    await connectDB();
    await Block.create({ blockId, createdBy, topic, difficulty });
    return NextResponse.json({ message: "Block Created" }, { status: 201 });
}

export async function GET() {
    await connectDB();
    const blocks = await Block.find();
    return NextResponse.json({ blocks });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();
    await Block.findByIdAndDelete(id);
    return NextResponse.json({ message: "Block Deleted" }, { status: 200 });
}