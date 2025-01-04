const { createUploadthing } = require("uploadthing/next");

const f = createUploadthing();

export const ourFileRouter = {
    blockPdf: f({
        pdf: {
            maxFileSize: "10MB",
            maxFileCount: 1,
        }
    })
    .onUploadComplete(() => {}),
};