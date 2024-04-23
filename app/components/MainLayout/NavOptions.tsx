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
        <div className="flex flex-column justify-center w-full text-[color:var(--theme-text)] font-montserrat">
            <ul className="flex flex-col  gap-y-4 py-5">
                <li className="flex flex-row jusitfy-content align-items hover:text-chirp-c hover:cursor-pointer " onClick={handleChangeCenterPanelToHomeClick}>
                    <div className="flex flex-row justify-center gap-x-3 items-center ">
                        <div >
                            <Image src={Home} width={30} alt="Home Icon">
                            </Image>
                        </div>
                        Home
                    </div>
                </li>
                <li className="flex flex-row jusitfy-content align-items hover:text-chirp-h hover:cursor-pointer " onClick={handleChangeCenterPanelToNotificationsClick}>
                    <div className="flex flex-row justify-center gap-x-3 items-center ">
                        <div className="hover:text-[color:var(--theme-hover)]">
                            <Image src={Notification} width={30} alt="Notifications Icon">
                            </Image>
                        </div>
                        Follow Requests
                        {user.follow_requests.size > 0 && (
                            <p className=" font-sans-400 text-chirp-c relative top-[-5px] right-[8px]">
                                {user.follow_requests.size}
                            </p>
                        )}
                    </div>
                </li>
                <li className="flex flex-row jusitfy-content align-items  hover:text-chirp-i hover:cursor-pointer" onClick={handleChangeCenterPanelToMyProfileClick}>
                    <div className="flex flex-row justify-center gap-x-3 items-center ">
                        <div>
                            <Image src={Profile} width={30} alt="My Profile Icon">
                            </Image>
                        </div>
                        My Profile
                    </div>
                </li>
            </ul>

        </div>

    )
}
export default NavOptions;