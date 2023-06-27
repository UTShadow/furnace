import React from 'react'
import Link from 'next/link'
import {Icons} from './ui/Icons'
import { buttonVariants } from './ui/Button'

const Navbar = () => {
  return (
    <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-zinc-300 z-[10] py-2'>
      <div className='container max-w-7x1 h-full mx-auto flex items-center justify-between gap-2'>
        {/*logo*/}
        <Link href='/' className='flex gap-2 items-center'>
          <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6'/>
          <p className='hidden text-zinc-700 text-sm font-medium md:block'>Furnace</p>
        </Link>

        {/*search bar */}

        <Link href='/sign-in' className={buttonVariants()}></Link>
      </div>
    </div>
  )
}

export default Navbar

