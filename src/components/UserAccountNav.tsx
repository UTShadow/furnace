'use client'

import {User} from 'next-auth'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/DropDownMenu'
import {UserAvatar} from './UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Checkbox } from './ui/Checkbox'
import { useState } from 'react'

interface UserAccountNavProps {
    user: Pick<User, 'name' | 'image' | 'email'>
}
interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
    user: Pick<User, 'name' | 'image' | 'email'>
}
  export  function UserAccountNav({ user}: UserAccountNavProps) {
    const [feed, setFeed] = useState(false);
    const handleChange = () => {
      setFeed(!feed);
      return (feed)
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar
            user={{ name: user.name || null, image: user.image || null }}
            className='h-12 w-12'
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white' align='end'>
          <div className='flex items-center justify-start gap-2 p-2'>
            <div className='flex flex-col space-y-1 leading-none'>
              {user.name && (
                <p className='font-medium'>
                  {user.name}
                </p>
              )}
              {user.email && (
                <p className='w-[200px] truncate text-sm text-muted-foreground'>
                  {user.email}
                </p>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          {/*<DropdownMenuItem asChild>  // for future to solve problem with empty customfeed
            <div>
            
                <div className="grid gap-1.5 leading-none">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                     CustomFeed &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  </label>
                </div>
                <Checkbox
                  checked = {feed}
                  onCheckedChange = {handleChange}
                  id="FeedBollean"/>
            </div> 
            </DropdownMenuItem>*/}
  
          <DropdownMenuItem asChild>
            <Link href='/f/create'>Create Community</Link>
          </DropdownMenuItem>
  
          <DropdownMenuItem asChild>
            <Link href='/settings'>Change Name</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className='cursor-pointer'
            onSelect={(event) => {
              event.preventDefault()
              signOut({
                callbackUrl: `${window.location.origin}/sign-in`,
              })
            }}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  