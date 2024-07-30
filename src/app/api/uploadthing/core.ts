import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const fileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      console.log("middleware");
      // const body = await req.json();
      // const { username } = body;
      //
      // const user = await db
      //   .select()
      //   .from(users)
      //   .where(eq(users.name, username))
      //   .execute();
      //
      // if (user.length === 0) {
      //   throw new UploadThingError("Unauthorized");
      // }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: 123 };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type fileRouter = typeof fileRouter;
