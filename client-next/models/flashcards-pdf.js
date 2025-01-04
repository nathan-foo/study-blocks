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

export const flashcardOutlineFromPdf = async (pdfUrl) => {
    const PROMPT = 'Generate flashcards for review based on this document. Each flashcard will have a question and an answer. Make enough flashcards to cover every topic in the document. Do not use HTML properties or formatting. Use underscores for subscripts and ^ for superscripts if needed. Write all results in JSON format. Copy the following structure:\nset:\n[\n{\nquestion: string,\nanswer: string,\n}\n]'

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