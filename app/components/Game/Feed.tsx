'use client'
import React from 'react'
import Post from '@/app/components/Post/Post';
import { PostType } from '@/app/page';
import { GeneralUserInterface } from '@/app/page';

const Feed: React.FC<{ posts: PostType[], handleProfileClick: (show: string, ui?: GeneralUserInterface) => void }> = ({ posts, handleProfileClick }) => {
    return (
        <div className='h-full w-full'>
            {posts
                .sort((a, b) => a.order - b.order) // Sort posts by order
                .map((post) => {
                    return (
                        <Post
                            post={post}
                            key={post.user + String(post.key)}
                            handleProfileClick={handleProfileClick}
                        />
                    );
                })}
        </div>
    )
}

export default Feed;