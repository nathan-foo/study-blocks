const { createUploadthing } = require("uploadthing/next");

const f = createUploadthing();

export const ourFileRouter = {
    blockPdf: f({
        pdf: {
            maxFileSize: "12MB",
            maxFileCount: 1,
        }
    })
    .onUploadComplete(() => {}),
};