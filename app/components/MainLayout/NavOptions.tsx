import Image from "next/image"
import React from 'react'

import Profile from '@/public/assets/icons/profile.svg'
import Notification from '@/public/assets/icons/notification.svg'
import Home from '@/public/assets/icons/home.svg'

import { GeneralUserInterface, PrimaryUserInterface } from "@/app/page"


const NavOptions: React.FC<{ user: PrimaryUserInterface, NewPostClickHandler: () => void, handleChangeCenterPanelClick: (show: string, p?: GeneralUserInterface) => void }> = ({ NewPostClickHandler, handleChangeCenterPanelClick, user }) => {
    const handleNewPostClick = () => {
        NewPostClickHandler()
    }

    const handleChangeCenterPanelToNotificationsClick = () => {
        handleChangeCenterPanelClick('notifications')
    }

    const handleChangeCenterPanelToHomeClick = () => {
        handleChangeCenterPanelClick('feed')
    }

    const handleChangeCenterPanelToMyProfileClick = () => {
        handleChangeCenterPanelClick('myprofile', undefined)
    }

    return (
        <div className="w-full text-[color:var(--theme-text)] font-montserrat">
            <ul className="flex flex-col gap-y-4 py-5 justify-center content-center ">
                <li className="gap-2 items-center flex content-center hover:text-chirp-h hover:cursor-pointer" onClick={handleChangeCenterPanelToHomeClick}>
                    <div >
                        <Image src={Home} width={30} alt="Home Icon">
                        </Image>
                    </div>
                    <div className="hidden md:inline align-center">Home</div>
                </li>
                <li className="flex content-center hover:text-chirp-h hover:cursor-pointer gap-2 items-center " onClick={handleChangeCenterPanelToNotificationsClick}>
                    <div className="hover:text-[color:var(--theme-hover)]">
                        <Image src={Notification} width={30} alt="Notifications Icon">
                        </Image>
                    </div>
                    <div className="hidden md:inline align-center ">Follow Requests</div>

                    {user.follow_requests.size > 0 && (
                        <p className=" font-sans-400 text-chirp-c relative top-[-5px] right-[8px]">
                            {user.follow_requests.size}
                        </p>
                    )}
                </li>
                <li className="flex content-center  hover:text-chirp-h hover:cursor-pointer gap-2 items-center " onClick={handleChangeCenterPanelToMyProfileClick}>
                    <div>
                        <Image src={Profile} width={30} alt="My Profile Icon">
                        </Image>
                    </div>
                    <div className="hidden md:inline align-center">My Profile</div>
                </li>
            </ul>

        </div>

    )
}
export default NavOptions;