# Study Blocks

An AI tool to transform student note PDFs into flashcards, course review material, and multiplayer game quizzes.

## Tools and Technologies
- Next.js
- React/Tailwind CSS
- Express.js
- MongoDB
- Socket.io
- Gemini API
- Clerk Authentication
- UploadThing

## Repository Structure

```
.
├── backend
└── client-next
    ├── app
    │   ├── (auth)
    │   │   ├── sign-in
    │   │   │   └── [[...sign-in]]
    │   │   └── sign-up
    │   │       └── [[...sign-up]]
    │   ├── (pages)
    │   │   ├── (routes)
    │   │   │   ├── about
    │   │   │   ├── contact
    │   │   │   ├── create
    │   │   │   ├── dashboard
    │   │   │   │   └── [id]
    │   │   │   │       ├── flashcards
    │   │   │   │       ├── quiz
    │   │   │   │       └── review
    │   │   │   └── play
    │   │   └── _components
    │   └── api
    │       ├── blocks
    │       │   └── [id]
    │       ├── uploadthing
    │       ├── users
    │       │   └── [id]
    │       └── webhooks
    │           └── clerk
    ├── components
    │   └── ui
    ├── lib
    ├── models
    └── public
        ├── fonts
        └── images
```
