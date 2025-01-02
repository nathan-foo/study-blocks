import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

export const courseOutlineFromPdf = async (pdfUrl) => {
    const pdfResp = await fetch(pdfUrl)
        .then((response) => response.arrayBuffer());

    const result = await model.generateContent([
        {
            inlineData: {
                data: Buffer.from(pdfResp).toString("base64"),
                mimeType: "application/pdf",
            },
        },
        'Summarize this document',
    ]);
    
    return result;
}