import { FollowRequestInterface, UserInterface } from '@/app/page'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Notification: React.FC<{ user_from_requests: FollowRequestInterface, handleProfileClick: (show: string, profile?: UserInterface) => void, handleAcceptDenyClick: (result: FollowRequestInterface) => void }> = ({ user_from_requests, handleProfileClick, handleAcceptDenyClick }) => {
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    useEffect(() => {
        // const uv: UserInterface = { avatar: avatar!, bio: bio!, userName: user!, interests: 'fashion' }
        // setUserData(uv)

        // Get Image
        const getImage = async () => {
            try {
                const imageModule = await import(`@/public/assets/icons/${user_from_requests.user.avatar}-bird.svg`);
                setAvatarUrl(imageModule.default);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };
        getImage();
    }, [user_from_requests.user.avatar])

    const handleProfileClickLocal = () => {
        handleProfileClick('profile', user_from_requests.user)
    }

    const handleAcceptLocal = () => {
        user_from_requests.accepted_request = true
        handleAcceptDenyClick(user_from_requests)
    }

    const handleDenyLocal = () => {
        user_from_requests.accepted_request = false
        handleAcceptDenyClick(user_from_requests)
    }

    return (
        <div className='w-full flex flex-col justify-center center-content border border-[var(--theme-accent)] gap-3 p-4 md:rounded'>
            <div className='flex flex-row justify-start items-center gap-2'>
                <div onClick={handleProfileClickLocal} className='hover:cursor-pointer'>
                    <Image src={avatarUrl} width={50} alt='Profile Image'></Image>
                </div>
                <div className='flex flex-row gap-1'>
                    <h2 className='font-semibold hover:cursor-pointer' onClick={handleProfileClickLocal}>
                        {user_from_requests.user.userName}
                    </h2>
                    would like to follow you
                </div>
            </div>
            <div className='flex flex-row gap-4'>
                <div onClick={handleAcceptLocal} className='hover:cursor-pointer hover:text-[color:var(--theme-hover)]'>
                    Accept
                </div>
                <div className='hover:cursor-pointer hover:text-[color:var(--theme-hover)]' onClick={handleDenyLocal}>
                    Deny
                </div>
            </div>
        </div>

    )
}

export default Notification