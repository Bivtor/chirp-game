'use client'
import React, { useEffect, useState } from 'react'
import { GeneralUserInterface } from '../../page'
import Image from 'next/image'
import Post from '../Post/Post'
import { PostType } from '@/app/page'

const GeneralProfilePage: React.FC<{ UserObject: GeneralUserInterface }> = ({ UserObject }) => {
    // const [userData, setUserData] = useState<UserInterface>({ avatar: '', bio: '', interests: '', userName: '' }) // new post form or not
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    useEffect(() => {
        // const uv: UserInterface = { avatar: avatar!, bio: bio!, userName: user!, interests: 'fashion' }
        // setUserData(uv)

        // Get Image
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

    return (
        <div className='flex flex-col justify-center items-center pt-8 px-6 gap-6 w-full h-full'>
            <h1 className='text-xl'>
                {UserObject.userName}&apos;s Profile
            </h1>
            <div className=''>
                <Image src={avatarUrl} alt='Profile Icon' width={100} />
            </div>
            <div className='text-lg'>
                {UserObject.bio}
            </div>

            <div className='text-lg'>
                {UserObject.userName}&apos;s Posts:
            </div>

            {UserObject.posts.length > 0 ? (
                <div className='flex flex-col w-full gap-t-4 overflow-y-scroll h-full'>
                    {UserObject.posts.map((post) => (
                        <Post post={post} key={post.key} />
                    ))}
                </div>
            ) : (
                <div>No Posts Yet!</div>
            )}
        </div>
    );

}
export default GeneralProfilePage