"use client"
import { startTransition, FC } from 'react'
import { Button } from './ui/Button'
import { useMutation } from '@tanstack/react-query'
import { SubscribeToThreadPayload } from '@/lib/validators/flame'
import axios, { AxiosError } from 'axios'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface SubscribeLeaveToggleProps{
    threadId: string
    threadName: string
    isSubscribed: boolean
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
    threadId,
    isSubscribed,
    threadName,
}: SubscribeLeaveToggleProps) => {

    
    const { toast } = useToast()
    const { loginToast } = useCustomToast()
    const router = useRouter()

    const {mutate: subscribe, isLoading: isSubLoading} = useMutation({
        mutationFn: async ()=> {
            const payload: SubscribeToThreadPayload = {
                 threadId,
            }

            const {data} = await axios.post('/api/Flame/subscribe', payload)
            return data as string
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if(err.response?.status === 401) {
                    return loginToast()
                }
            }

            return toast({
                title: ' There was aproblem',
                description: 'Something went wrong, please try again',
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            startTransition(() => {
                    router.refresh()
            })
            return toast ({
                title: 'Subscribed',
                description: `You are now subscribed to f/${threadName}`,
            })
        },
    })
    const {mutate: unSubscribe, isLoading: isUnSubLoading} = useMutation({
        mutationFn: async ()=> {
            const payload: SubscribeToThreadPayload = {
                 threadId,
            }

            const {data} = await axios.post('/api/Flame/unsubscribe', payload)
            return data as string
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if(err.response?.status === 401) {
                    return loginToast()
                }
            }

            return toast({
                title: ' There was aproblem',
                description: 'Something went wrong, please try again',
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            startTransition(() => {
                    router.refresh()
            })
            return toast ({
                title: 'Unsubscribed',
                description: `You are now unsubscribed from f/${threadName}`,
            })
        },
    })

  return isSubscribed ? (
  <Button isLoading = {isUnSubLoading} onClick = {() => unSubscribe()} className='w-full mt-1 mb-4'>Leave comunity</Button>
  ) : (
  <Button isLoading = {isSubLoading} onClick = {() => subscribe()} className='w-full mt-1 mb-4'>Join to post</Button>
  )
}

export default SubscribeLeaveToggle

