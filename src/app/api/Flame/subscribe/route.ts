import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ThreadSubscriptionValidator } from "@/lib/validators/flame";
import { z } from "zod"

export async function POST(req: Request) {
    try {
        const session = await getAuthSession()

        if(!session?.user) {
            return new Response('Unauthorized', {status: 401})
        }

        const body = await req.json()

        const {threadId} = ThreadSubscriptionValidator.parse(body)

        const subscriptionExists = await db.subscription.findFirst({
            where: {
                threadId,
                userId: session.user.id,
            },
        })

        if(subscriptionExists) {
            return new Response('You are already subscribed to this Flame.', {
                status: 400,
            })
        }

        await db.subscription.create({
            data: {
                threadId,
                userId: session.user.id,
            }
        })
        return new Response(threadId)
    } catch (error) {
        if(error instanceof z.ZodError) {
            return new Response('Invalid request data passed', {status: 422 })
        }
        return new Response('Could not create Flame', {status: 500})
    }
}