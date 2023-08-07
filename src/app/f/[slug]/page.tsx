import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { notFound } from 'next/navigation'
import MiniCreatePost from '@/components/MiniCreatePost'

interface PageProps {
    params: {
        slug: string

    }
}

const page = async ({params}: PageProps) => {
    const { slug } = params

    const session = await getAuthSession()

    const thread = await db.thread.findFirst({
        where: {name: slug},
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    comments: true,
                    thread: true,
                },

                take: INFINITE_SCROLL_PAGINATION_RESULTS,
            },
        },
    })
    if(!thread) return notFound()

  return( 
    <>
        <h1 className='font-bold text-3x1 md:text-4x1 h-14'>
            {thread.name}
        </h1>
        <MiniCreatePost session={session}/>
    </>
  )
}

export default page