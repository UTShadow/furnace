'use client'
import * as React from 'react'
import { FC } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { Icons } from './Icons'
import { useToast } from '@/hooks/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const {toast} = useToast()

    const loginWithGoogle = async () => {
        setIsLoading(true)

        try {
            await signIn('google')
        } catch (error){
            
            toast({
                title: 'There was a problem.',
                description: 'There was an ERROR logging in with Google',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className={cn('flex justify-center', className)} {...props}>
            <Button 
                isLoading={isLoading}
                type='button'
                size='sm'
                className='w-full'
                onClick={loginWithGoogle}
                disabled={isLoading}
            >
                    {isLoading ? null :  <Icons.google className='h-4 w-4 mr-2'/>}
                Google
            </Button>
        </div>
  )
}

export default UserAuthForm