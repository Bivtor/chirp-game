import Link from "next/link"
import Image from "next/image"
import styles from '@/app/components/MainLayout/menu.module.css'
import React from 'react'

import Profile from '@/public/assets/icons/profile.svg'
import Notification from '@/public/assets/icons/notification.svg'
import Home from '@/public/assets/icons/home.svg'
import NewPost from '@/public/assets/icons/new-post.svg'

import { UserValues } from "@/app/page"

const NavOptions: React.FC<{ FormValues: UserValues, NewPostClickHandler: () => void }> = ({ FormValues, NewPostClickHandler }) => {

    const handleNewPostClick = () => {
        NewPostClickHandler()
    }

    return (
        <div className="flex flex-column justify-center w-full text-[color:var(--theme-text)] ">
            <ul className="flex flex-col  gap-y-4 py-5">
                <li className="flex flex-row jusitfy-content align-items hover:text-[color:var(--theme-hover)]">
                    <Link href="/" >
                        <div className="flex flex-row justify-center gap-x-3 items-center ">
                            <div className={styles['menu-icon']}>
                                <Image src={Home} width={30} alt="Home Icon">
                                </Image>
                            </div>
                            Home
                        </div>
                    </Link>
                </li>
                <li className="flex flex-row jusitfy-content align-items hover:text-[color:var(--theme-hover)]">
                    <Link href="/notification" >
                        <div className="flex flex-row justify-center gap-x-3 items-center ">
                            <div className="hover:text-[color:var(--theme-hover)]">
                                <Image src={Notification} width={30} alt="Notifications Icon">
                                </Image>
                            </div>
                            Follow Requests
                        </div>
                    </Link>
                </li>
                <li className="flex flex-row jusitfy-content align-items  hover:text-[color:var(--theme-hover)]">
                    <Link href="/profile" >
                        <div className="flex flex-row justify-center gap-x-3 items-center ">
                            <div>
                                <Image src={Profile} width={30} alt="My Profile Icon">
                                </Image>
                            </div>
                            My Profile
                        </div>
                    </Link>
                </li>
                <li className="flex flex-row jusitfy-content align-items  hover:text-[color:var(--theme-hover)]">
                    <div className="flex flex-row justify-center gap-x-3 items-center hover:cursor-pointer" onClick={handleNewPostClick}>
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