import { z } from "zod";

export const StatusTxSchema = z.object({
    status: z.enum(["SUCCESS", "CANCELED"])
})
export type StatusTxType = z.infer<typeof StatusTxSchema>;