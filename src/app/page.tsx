import { buttonVariants } from "@/components/ui/Button";
import Link from 'next/link'
import { Home as HomeIcon } from 'lucide-react'
import { getAuthSession } from "@/lib/auth";
import GeneralFeed from "@/components/GeneralFeed";
import CustomFeed from "@/components/CustomFeed";

export default async function Home() {

  const session = await getAuthSession()
  return ( 
    <>
  <h1 className="font-bold text-3xl md:text-4x1">Your feed</h1>
  <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
    {session ? <CustomFeed/> : <GeneralFeed />}
    

    {/* thread info */}
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
            Your personal Furnace homepage. Let's see what's burning!
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
