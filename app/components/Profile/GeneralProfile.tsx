'use client'
import React, { useEffect, useState } from 'react'
import { GeneralUserInterface } from '../../page'
import Image from 'next/image'
import Post from '../Post/Post'

const GeneralProfilePage: React.FC<{ UserObject: GeneralUserInterface, handleBackClick: (show: string, profile?: GeneralUserInterface) => void }> = ({ UserObject, handleBackClick }) => {
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    useEffect(() => {
        const getImage = async () => {
            try {
                const imageModule = await import(`@/public/assets/icons/${UserObject.avatar}-bird.svg`);
                setAvatarUrl(imageModule.default);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };
        getImage();
    }, [UserObject.avatar])

    const handleBackClickLocal = () => {
        handleBackClick('notifications')
    }

    return (
        <div className='font-montserrat flex flex-col justify-center items-center pt-8 px-6 gap-1'>
            <div className='flex flex-row items-center justify-between px-4 w-full'>
                <h2 className='hover:text-chirp-p hover:cursor-pointer' onClick={handleBackClickLocal}>
                    Back
                </h2>
                <div />

            </div>
            <h1 className='text-xl text-chirp-i'>
                {UserObject.userName}&apos;s Profile
            </h1>
            <div className=''>
                <Image src={avatarUrl} alt='Profile Icon' width={100} />
            </div>
            <div className='text-lg text-chirp-r text-center'>
                {UserObject.bio}
            </div>

            {UserObject.posts.length > 0 ? (
                <div className='flex flex-col w-full'>
                    {UserObject.posts.map((post) => (
                        <Post post={post} key={post.key} handleProfileClick={handleBackClick} />
                    ))}
                </div>
            ) : (
                <div>No Posts Yet!</div>
            )}
        </div>
    );

}
export default GeneralProfilePage