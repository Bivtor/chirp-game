import { GeneralUserInterface } from '@/app/page'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const Notification: React.FC<{ user_from_requests: GeneralUserInterface, handleProfileClick: (show: string, profile?: GeneralUserInterface) => void, handleAcceptDenyClick: (folowee: GeneralUserInterface, decision: boolean) => void }> = ({ user_from_requests, handleProfileClick, handleAcceptDenyClick }) => {
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    useEffect(() => {
        // const uv: UserInterface = { avatar: avatar!, bio: bio!, userName: user!, interests: 'fashion' }
        // setUserData(uv)

        // Get Image
        const getImage = async () => {
            try {
                const imageModule = await import(`@/public/assets/icons/${user_from_requests.avatar}-bird.svg`);
                setAvatarUrl(imageModule.default);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };
        getImage();
    }, [user_from_requests.avatar])

    // open users profile
    const handleProfileClickLocal = () => {
        handleProfileClick('profile', user_from_requests)
    }

    // accept follow request
    const handleAcceptLocal = () => {
        handleAcceptDenyClick(user_from_requests, true)
    }

    // deny follow request
    const handleDenyLocal = () => {
        handleAcceptDenyClick(user_from_requests, false)
    }

    return (
        <div className='w-full flex flex-col justify-center center-content border border-[var(--theme-accent)] gap-3 p-4 rounded-md'>
            <div className='flex flex-row justify-start items-center gap-2'>
                <div onClick={handleProfileClickLocal} className='hover:cursor-pointer'>
                    <Image src={avatarUrl} width={50} alt='Profile Image'></Image>
                </div>
                <div className='flex flex-row gap-1'>
                    <h2 className='text-chirp-h font-semibold hover:cursor-pointer' onClick={handleProfileClickLocal}>
                        {user_from_requests.userName}
                    </h2>
                    <span className='hidden md:inline '>
                        would like to follow you
                    </span>
                </div>
            </div>
            <div className='flex flex-row gap-4'>
                <div onClick={handleAcceptLocal} className='hover:cursor-pointer hover:text-chirp-r'>
                    Accept
                </div>
                <div className='hover:cursor-pointer hover:text-chirp-c' onClick={handleDenyLocal}>
                    Deny
                </div>
            </div>
        </div>

    )
}

export default Notification