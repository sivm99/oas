// import { fetchUser } from "@/Helper/getData";
// import createRequest from "@/Helper/request";
import { createUploadthing, type FileRouter } from "uploadthing/next";
// import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// const auth = async (req: Request) => {
//   const token = req.headers.get("authorization");
//   console.log("token", token);

//   if (!token) return null;
//   // Remove 'Bearer ' prefix if present
//   const cleanToken = token.startsWith("Bearer ") ? token.slice(7) : token;
//   const r = await fetchUser(cleanToken);
//   if (r.error || !r.user || !r.newToken) return null;
//   return { user: r.user, newToken: r.newToken };
// };

// export const ourFileRouter = {
//   // Define as many FileRoutes as you like, each with a unique routeSlug
//   imageUploader: f({ image: { maxFileSize: "128KB" } })
//     // Set permissions and file types for this FileRoute
//     .middleware(async ({ req }) => {
//       // This code runs on your server before upload
//       const r = await auth(req);
//       if (!r) throw new UploadThingError("Unauthorized");
//       const { user, newToken } = r;
//       // If you throw, the user will not be able to upload
//       if (!user) throw new UploadThingError("Unauthorized");
//       if (!user.emailVerified) throw new UploadThingError("Email not verified");
//       // Whatever is returned here is accessible in onUploadComplete as `metadata`
//       return { username: user.username, name: user.name, token: newToken };
//     })
//     .onUploadComplete(async ({ metadata, file }) => {
//       // This code RUNS ON YOUR SERVER after upload
//       console.log("Upload complete for userId:", metadata.username);

//       console.log("file url", file.url);
//       await createRequest(
//         "PATCH",
//         "/user/:username",
//         { username: metadata.username },
//         metadata.token,
//         { avatar: file.url },
//       );

//       // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
//       return { uploadedBy: metadata.name, url: file.url };
//     }),
// } satisfies FileRouter;

// Version without auth:

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "128KB" } })
    // .middleware(async ({ req }) => {
    //   return {};
    // })
    .onUploadComplete(async ({ file }) => {
      console.log("file url", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
