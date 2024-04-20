import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

export interface PostType {
    key: number;
    message: string;
    username: string;
    time: Timestamp;
    avatar: string;
}

const Post: React.FC<{ post: PostType }> = ({ post }) => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const toTimeAgo = () => {
        if (post.time) {
            var storedDate = post.time.toDate();
            return moment(storedDate).fromNow()
        }
        return moment(Date.now()).fromNow()
    }


    useEffect(() => {
        const getImage = async () => {
            try {
                const imageModule = await import(`@/public/assets/icons/${post.avatar}-bird.svg`);
                setAvatarUrl(imageModule.default);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        getImage();
    }, [post.avatar]);

    return (
        <div className='pb-1 pt-4 px-4 flex flex-col justify-start align-start text-[color:var(--theme-text)] border border-grey-400 md:rounded'>
            <div className='flex flex-row gap-2'>
                <div>
                    {avatarUrl && <Image src={avatarUrl} alt='bird image' width={50} />}
                </div>
                <div className='flex flex-col '>
                    <div className='font-normal'>
                        &nbsp;{post.username} · {toTimeAgo()}
                    </div>
                    <h5 className='font-semibold text-xs'>@{post.username}</h5>
                </div>
            </div>
            <div className='pb-4 pl-14' >
                {post.message}
            </div>
        </div>
    );
};

export default Post;
