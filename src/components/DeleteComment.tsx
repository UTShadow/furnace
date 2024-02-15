'use client'

import React, { FC } from 'react'
import { useMutation } from "@tanstack/react-query"
import { CommentDeleteRequest } from '@/lib/validators/deleteComm'
import { useRouter } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { Button } from './ui/Button'


interface CommentDeleteProps {
    commentId: string,
    
}
const DeleteComment: FC<CommentDeleteProps> = ({
    commentId,
}) => {
    const {loginToast} = useCustomToast()
    const router = useRouter()
    const {mutate: DeleteComment} = useMutation({
        mutationFn: async ({commentId}: CommentDeleteRequest) => {
            const payload: CommentDeleteRequest = {
                commentId,
                
                

            }
            await axios.patch(`/api/Flame/post/comment/delete`, payload)
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
        router.refresh()
        
    },

})



  return (
     
        <Button  
            onClick={() => 
                DeleteComment({commentId})
               
            }
            variant='subtle'
        > 
                Delete
        </Button>                   
    
    
  )
}

export default DeleteComment


