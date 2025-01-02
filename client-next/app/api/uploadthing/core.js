const { createUploadthing } = require("uploadthing/next");

const f = createUploadthing();

export const ourFileRouter = {
    blockPdf: f(["pdf"])
    .onUploadComplete(() => {}),
};