import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: 'models/gemini-1.5-flash',
    generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
    },
    // history: [
    //     {
    //         role: "model",
    //         parts: [
    //             {
                    
    //             }
    //         ]
    //     },
    //     {
    //         role: "model",
    //         parts: [
    //             {
                    
    //             },
    //         ],
    //     },
    // ],
});

export const quizOutlineFromPdf = async (pdfUrl) => {
    const PROMPT = 'Generate quiz questions and answers for review based on this document. Each question will have four answer choices with one correct answer. Write all results in JSON format. Copy the following structure:\nquestions:\n[\n{\nquestion: string,\nanswers:\n[\n{\nanswer: string,\ncorrect: boolean,\n}\n]\n}\n]'

    const pdfResp = await fetch(pdfUrl)
        .then((response) => response.arrayBuffer());

    const result = await model.generateContent([
        {
            inlineData: {
                data: Buffer.from(pdfResp).toString("base64"),
                mimeType: "application/pdf",
            },
        },
        PROMPT,
    ]);
    
    return result;
}