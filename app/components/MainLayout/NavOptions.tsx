import Link from "next/link"
import Image from "next/image"
import styles from '@/app/components/MainLayout/menu.module.css'
import React from 'react'

import Profile from '@/public/assets/icons/profile.svg'
import Notification from '@/public/assets/icons/notification.svg'
import Home from '@/public/assets/icons/home.svg'
import NewPost from '@/public/assets/icons/new-post.svg'

import { GeneralUserInterface } from "@/app/page"


const NavOptions: React.FC<{ NewPostClickHandler: () => void, handleChangeCenterPanelClick: (show: string, p?: GeneralUserInterface) => void }> = ({ NewPostClickHandler, handleChangeCenterPanelClick }) => {
    const handleNewPostClick = () => {
        NewPostClickHandler()
    }

    const handleChangeCenterPanelToNotificationsClick = () => {
        handleChangeCenterPanelClick('notifications')
    }

    const handleChangeCenterPanelToHomeClick = () => {
        handleChangeCenterPanelClick('home')
    }

    const handleChangeCenterPanelToMyProfileClick = () => {
        handleChangeCenterPanelClick('myprofile', undefined)
    }

    return (
        <div className="flex flex-column justify-center w-full text-[color:var(--theme-text)] ">
            <ul className="flex flex-col  gap-y-4 py-5">
                <li className="flex flex-row jusitfy-content align-items hover:text-[color:var(--theme-hover)] hover:cursor-pointer" onClick={handleChangeCenterPanelToHomeClick}>
                    <div className="flex flex-row justify-center gap-x-3 items-center ">
                        <div className={styles['menu-icon']}>
                            <Image src={Home} width={30} alt="Home Icon">
                            </Image>
                        </div>
                        Home
                    </div>
                </li>
                <li className="flex flex-row jusitfy-content align-items hover:text-[color:var(--theme-hover)] hover:cursor-pointer" onClick={handleChangeCenterPanelToNotificationsClick}>
                    <div className="flex flex-row justify-center gap-x-3 items-center ">
                        <div className="hover:text-[color:var(--theme-hover)]">
                            <Image src={Notification} width={30} alt="Notifications Icon">
                            </Image>
                        </div>
                        Follow Requests
                    </div>
                </li>
                <li className="flex flex-row jusitfy-content align-items  hover:text-[color:var(--theme-hover)] hover:cursor-pointer" onClick={handleChangeCenterPanelToMyProfileClick}>
                    <div className="flex flex-row justify-center gap-x-3 items-center ">
                        <div>
                            <Image src={Profile} width={30} alt="My Profile Icon">
                            </Image>
                        </div>
                        My Profile
                    </div>
                </li>
                <li className="flex flex-row jusitfy-content align-items  hover:text-[color:var(--theme-hover)] hover:cursor-pointer" onClick={handleNewPostClick}>
                    <div className="flex flex-row justify-center gap-x-3 items-center " >
                        <div className="">
                            <Image src={NewPost} width={30} alt="Create New Post Icon">
                            </Image>
                        </div>
                        Create Post
                    </div>
                </li>
            </ul>

        </div>

    )
}
export default NavOptions;