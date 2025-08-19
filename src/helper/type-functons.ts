import z from "zod";

const userSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  isEmailVerified: z.boolean(),
  aliasCount: z.number(),
  destinationCount: z.number(),
});
const ruleSchema = z.object({
  ruleId: z.string(),
  username: z.string(),
  aliasEmail: z.string().email(),
  destinationEmail: z.string().email(),
  isActive: z.boolean(),
});

const destinationSchema = z.object({
  destinationId: z.string(),
  username: z.string(),
  destinationEmail: z.string().email(),
  domain: z.string(),
  isVerified: z.boolean(),
});
const responseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: userSchema,
});

type UserResponse = z.infer<typeof responseSchema>;

function isUserResponse(response: unknown): response is UserResponse {
  return responseSchema.safeParse(response).success;
}

// ---------- Generic Response Schema ----------
const makeResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    status: z.string(),
    message: z.string(),
    data: dataSchema,
  });

// ---------- Specialized Response Schemas ----------
const rulesResponseSchema = makeResponseSchema(z.array(ruleSchema));
const destinationsResponseSchema = makeResponseSchema(
  z.array(destinationSchema),
);

// ---------- Inferred Types ----------
type RulesResponse = z.infer<typeof rulesResponseSchema>;
type DestinationsResponse = z.infer<typeof destinationsResponseSchema>;

// ---------- Type Guards ----------
function isRulesResponse(response: unknown): response is RulesResponse {
  return rulesResponseSchema.safeParse(response).success;
}

function isDestinationsResponse(
  response: unknown,
): response is DestinationsResponse {
  return destinationsResponseSchema.safeParse(response).success;
}



export { isUserResponse, isRulesResponse, isDestinationsResponse };
