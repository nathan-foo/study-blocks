import { NextResponse } from "next/server";
import connectDB from "@/libs/mongodb";
import Course from "@/models/course";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newTitle: title, newDescription: description, newCreatedBy: createdBy } = await request.json();
    await connectDB();
    await Course.findByIdAndUpdate(id, { title, description, createdBy });
    return NextResponse.json({ message: "Course Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectDB();
    const course = await Course.findOne({ _id: id });
    return NextResponse.json({ course }, { status: 200 });
}