import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { PostType } from '@/app/page';
import { GeneralUserInterface } from '@/app/page';


const Post: React.FC<{ post: PostType, handleProfileClick: (show: string, ui?: GeneralUserInterface) => void }> = ({ post, handleProfileClick }) => {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const getMessageTime = () => {
        return `${post.order} days ago`
    }

    useEffect(() => {
        const getImage = async () => {
            try {
                const imageModule = await import(`@/public/assets/icons/${post.user.avatar}-bird.svg`);
                setAvatarUrl(imageModule.default);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        getImage();
    }, [post.user.avatar]);

    const handleLocalClick = () => {
        handleProfileClick('profile', post.user)

    }
    return (
        <div className='pb-3 pt-4 px-4 flex flex-col text-[color:var(--theme-text)] border border-[var(--theme-accent)] md:rounded font-montserrat'>
            <div className='flex flex-row gap-2'>
                <div onClick={handleLocalClick} className='hover:cursor-pointer'>
                    {avatarUrl && <Image src={avatarUrl} alt='bird image' width={50} />}
                </div>
                <div className='flex flex-col '>
                    <div className='font-normal '>
                        <span onClick={handleLocalClick} className='text-chirp-h hover:cursor-pointer'>&nbsp;{post.user.userName}</span>
                        <span> · </span>
                        <span className='text-chirp-p'>{post.order} {' '} {post.order > 1 ? ' days ago' : ' day ago'}</span>
                    </div>
                    <h5 className='font-semibold text-xs text-chirp-r'>@{post.user.userName}</h5>
                </div>
            </div>
            <div className='pl-14 text-chirp-h leading-relaxed ' >
                <span>{post.message}</span>

            </div>
        </div>
    );
};

export default Post;
