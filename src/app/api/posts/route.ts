import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

export async function GET(req: Request) {
    const url = new URL(req.url)
//checking for login user

    const session = await getAuthSession()
//checking for followed threads(flames)
    let followedCommunitiesIds: string[] = []

    if(session ) {
        const followedCommunities = await db.subscription.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                thread: true,
            },
        })

        followedCommunitiesIds = followedCommunities.map(
            ({ thread }) => thread.id
        )
    }

    try {
        const { limit, page , threadName} = z.object({
            limit: z.string(),
            page: z.string(),
            threadName: z.string().nullish().optional(),
        }).parse({
            threadName: url.searchParams.get('threadName'),
            limit: url.searchParams.get('limit'),
            page: url.searchParams.get('page'),
        })
        let whereClause = {}

            if(threadName){
                whereClause = {
                    thread: {
                        name: threadName,
                    },
                }
        } else if (session) {
            whereClause ={
                thread: {
                    id: {
                        in: followedCommunitiesIds
                    },
                },
            }
        }

        const posts = await db.post.findMany({
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit),
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            thread: true,
            votes: true,
            author: true,
            comments: true,
        },
        where: whereClause,
        })

        return new Response(JSON.stringify(posts))
    } catch (error) {
        if(error instanceof z.ZodError) {
            return new Response('Invalid request data passed', {status: 422 })
        }
        return new Response('Could not fetch more posts :c', {status: 500})

    }
}