'use client'
import React from 'react'
import Post from '@/app/components/Post/Post';
import { PostType } from '@/app/page';
import { GeneralUserInterface } from '@/app/page';

const Feed: React.FC<{ posts: PostType[], handleProfileClick: (show: string, ui?: GeneralUserInterface) => void }> = ({ posts, handleProfileClick }) => {
    return (
        <div className='flex flex-col w-full gap-t-4 overflow-y-scroll '>
            {posts.map((post) => {
                return (
                    <Post post={post} key={post.key} />
                )
            })}
        </div>

    )
}

export default Feed;