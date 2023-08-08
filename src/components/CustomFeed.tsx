import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { db } from "@/lib/db"
import PostFeed from "./PostFeed"
import { getAuthSession } from "@/lib/auth"

const CustomFeed = async () => {

    const session = await getAuthSession()

    const followedComunities = await db.subscription.findMany({
        where: {
            userId: session?.user.id
        },
        include: {
            thread: true,
        },
    })

    const posts = await db.post.findMany({
        where: {
            thread: {
                name: {
                    in: followedComunities.map(({ thread }) => thread.id),
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            votes: true,
            author: true,
            comments: true,
            thread: true,
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
    })
    

    return <PostFeed initialPosts={posts}/>
}

export default CustomFeed