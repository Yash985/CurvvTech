import z from "zod";

export const NewDeviceSchema = z.object({
  name: z.string(),
  type: z.string(),
  status: z.string(),
});

export const UpdateDeviceSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
});

export const LogEntrySchema = z.object({
  event: z.string(),
  value: z.number(),
});
