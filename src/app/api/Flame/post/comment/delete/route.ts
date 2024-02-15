
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { CommentDeleteValidator } from "@/lib/validators/deleteComm"

import { z } from "zod"

export async function PATCH(req: Request) {
    
    try {
        const body = await req.json()
        console.log('PATCH')
        const {commentId} = CommentDeleteValidator.parse(body)

        const session =await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }
        await db.comment.delete({
            where:{
                id: commentId,
                
            }    
        })

        return new Response('OK')
    } catch (error) {
        
        if(error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }
        return new Response('Could not delete this comment right now, please try again later', {status: 500})
    }}