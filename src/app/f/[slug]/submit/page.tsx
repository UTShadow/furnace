
import { Editor } from '@/components/Editor'
import { Button } from '@/components/ui/Button'
import { db } from '@/lib/db'
import { notFound} from 'next/navigation'
import React from 'react'

interface pageProps{
    params: { 
        slug: string
    }
}

const page = async ({ params }: pageProps ) => {

    const thread = await db.thread.findFirst({
        where: {
            name: params.slug,
        },
    })

    if(!thread) return notFound()

  return ( 
    <div className='flex flex-col items-start gap-6'>
        <div className='border-b border-gray-200 pb-5'>
            <div className='-ml-2 -mt-2 flex flex-wrap items-baseline'>
                <h3 className='ml-2 mt-2 text-base font-semibold leading-6 text-gray-900'>
                  Create Post
                </h3>
                <p className='ml-2 mt-1 truncate text-sm text-gray-500'>
                    in f/{params.slug}
                </p>
            </div>
        </div>
        
        <Editor threadId={thread.id}/>

        <div className='w-full flex flex-col justify-end'>
            <Button type='submit' className='w-full py-2' form='thread-post-form'>
                Post
            </Button>
        </div>
    </div>
  )
}

export default page