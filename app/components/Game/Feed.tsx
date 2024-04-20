'use client'
import React from 'react'
import { useEffect, useState } from 'react';

import Post, { PostType } from '../Post/Post';

const Feed: React.FC<{ posts: PostType[] }> = ({ posts }) => {



    return (
        <div className='flex flex-col w-full gap-t-4 overflow-y-scroll h-full'>
            {posts.map((post) => {
                return (
                    <Post post={post} key={post.key} />
                )
            })}
        </div>

    )
}

export default Feed;