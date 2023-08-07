import type { Post, Subreddit, User, Vote, Comment } from '@prisma/client'

export type ExtendedPost = Post & {
    thread: Thread
    votes: Vote[]
    author: User
    comments: Comment[]
}