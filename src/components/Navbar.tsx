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
    <div className='fixed top-0 inset-x-0 h-fit bg-orange-500 border-b-2 border-zinc-700 z-[10] pt-2 pb-1'>
      <div className='container max-w-7xl h-full mx-auto flex place-items-center justify-between gap-2'>
        
        <Link href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-14 w-14'/>
          <p className='hidden text-zinc-800 text-4xl font-medium md:block'>
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

