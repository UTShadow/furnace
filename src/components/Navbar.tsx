import React from 'react'
import Link from 'next/link'
import {Icons} from './Icons'
import { buttonVariants } from './ui/Button'
import { getAuthSession } from '@/lib/auth'
import { UserAccountNav } from './UserAccountNav'
import SearchBar from './SearchBar'

const Navbar = async () => {

  const session = await getAuthSession()
  
  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-zinc-300 z-[10] py-2'>
      <div className='container max-w-7x1 h-full mx-auto flex items-center justify-between gap-2'>
        
        <Link href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-12 w-12 sm:h-10 sm:w-10'/>
          <p className='hidden text-zinc-700 text-xl font-medium md:block'>
            Furnace
          </p>
        </Link>

        <SearchBar/>

        {session?.user ? (
         
          <UserAccountNav user = {session.user}/>
        ) : (
          <Link href='/sign-in' className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar

