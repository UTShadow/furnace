import { buttonVariants } from "@/components/ui/Button"
import Link from 'next/link'
import CustomFeed from "@/components/CustomFeed"
import { getAuthSession } from "@/lib/auth"
import GeneralFeed from "@/components/GeneralFeed"
import { HomeIcon } from "lucide-react"

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  const session = await getAuthSession()
  
  return ( 
  <>
    <h1 className="font-bold text-3xl md:text-4xl">
      Your <a className="text-orange-500">f</a>eed
    </h1>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
    
      { session  ? <CustomFeed/> : <GeneralFeed/>}

      <div className="overflow-hidden h-fit rounded-lg border border-gray-400 order-first md:order-last">
        <div className="bg-orange-500 px-6 py-4">
          <p className="font-semibold text-xl py-3 flex items-center gap-1.5">
            <HomeIcon className="w-6 h-6"/>
              Home
          </p>
        </div>
      <div className="-my-3 divide-y divide-gray-300 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <p className="text-zinc-500 text-base">
            Your personal Furnace homepage. Let&#39;s see what&#39;s burning!
          </p>
        </div>

          <Link 
            className={buttonVariants({className: 'w-full mt-4 mb-6'
            })} 
            href={'/f/create'}>
            Create Your own flame
          </Link>
        
        </div>
      </div>
    </div>
  </>
  )
}
