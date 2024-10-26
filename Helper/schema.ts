import { z } from "zod";

// Helper regex patterns
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9._-]*$/;
const ALIAS_SLUG_REGEX = /^[a-zA-Z0-9.+\-]+$/;

// Base validation schemas for each field type
const nameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(64, "Name must be at most 64 characters");

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Invalid email format")
  .regex(EMAIL_REGEX, "Invalid email format");

const usernameSchema = z
  .string()
  .trim()
  .min(4, "Username must be at least 4 characters")
  .regex(
    USERNAME_REGEX,
    "Username must start with a letter and can only contain letters, numbers, dots, hyphens, and underscores",
  );

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(16, "Password must be at most 16 characters");

const aliasSchema = z
  .string()
  .trim()
  .regex(
    ALIAS_SLUG_REGEX,
    "Alias can only contain letters, numbers, dots, hyphens, and plus signs",
  );

const commentSchema = z
  .string()
  .trim()
  .max(256, "Comment must be at most 256 characters");

// Registration schema
export const registrationSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    passwordConfirm: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

// Login schema
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Password change schema
export const passwordChangeSchema = z
  .object({
    currentPassword: passwordSchema,
    password: passwordSchema,
    passwordConfirm: passwordSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

// Alias creation schema
export const aliasCreationSchema = z.object({
  aliasEmail: aliasSchema,
  destinationEmail: emailSchema,
});

// Comment schema
export const commentSubmissionSchema = z.object({
  comment: commentSchema,
});

// Example usage in API route:
/*
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = registrationSchema.parse(body);
    // Process validated data
    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ errors: error.errors }, { status: 400 });
    }
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
*/

export type RegistrationType = z.infer<typeof registrationSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type PasswordChangeType = z.infer<typeof passwordChangeSchema>;
export type AliasCreationType = z.infer<typeof aliasCreationSchema>;
export type CommentSubmissionType = z.infer<typeof commentSubmissionSchema>;
