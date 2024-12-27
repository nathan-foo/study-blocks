import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Course from "@/models/course";

export async function POST(request) {
    const { title, description, createdBy } = await request.json();
    await connectDB();
    await Course.create({ title, description, createdBy });
    return NextResponse.json({ message: "Course Created" }, { status: 201 });
}

export async function GET() {
    await connectDB();
    const courses = await Course.find();
    return NextResponse.json({ courses });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();
    await Course.findByIdAndDelete(id);
    return NextResponse.json({ message: "Course Deleted" }, { status: 200 });
}