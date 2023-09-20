import { z } from "zod"

export const CommentDeleteValidator = z.object({
   commentId: z.string(),
   
  
})

export type CommentDeleteRequest = z.infer<typeof CommentDeleteValidator>