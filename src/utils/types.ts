import { z } from "zod";

export const AdvocateSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  degree: z.string(),
  specialties: z.array(z.string()),
  yearsOfExperience: z.number(),
  phoneNumber: z.number(),
});

export const AdvocateArraySchema = z.object({
  data: z.array(AdvocateSchema)
});

export type Advocate = z.infer<typeof AdvocateSchema>;
export type AdvocateArray = z.infer<typeof AdvocateArraySchema>;