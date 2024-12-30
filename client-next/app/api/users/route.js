import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(request) {
    const { clerkId, first_name, last_name, email } = await request.json();
    await connectDB();
    await User.create({ clerkId, first_name, last_name, email });
    return NextResponse.json({ message: "User Created" }, { status: 201 });
}

export async function GET(request) {
    const clerkId = request.nextUrl.searchParams.get("clerkId");

    const query = {};
    if (clerkId) query.clerkId = clerkId;

    await connectDB();

    const users = await User.find(query);
    return NextResponse.json({ users });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
}