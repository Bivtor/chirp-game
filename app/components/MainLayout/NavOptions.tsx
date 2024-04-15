import Link from "next/link"
import Image from "next/image"
import styles from '@/app/components/MainLayout/menu.module.css'

import Profile from '@/public/assets/icons/profile.svg'
import Notification from '@/public/assets/icons/notification.svg'
import Home from '@/public/assets/icons/home.svg'

export default function NavOptions() {
    return (
        <div className="flex flex-column justify-center w-full text-[color:var(--theme-text)]">
            <ul className="flex flex-col  gap-y-4 py-5">
                <li className="flex flex-row jusitfy-content align-items">
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
                <li className="flex flex-row jusitfy-content align-items">
                    <Link href="/notification" >
                        <div className="flex flex-row justify-center gap-x-3 items-center ">
                            <div>
                                <Image src={Notification} width={30} alt="Home Icon">
                                </Image>
                            </div>
                            Notifications
                        </div>
                    </Link>
                </li>
                <li className="flex flex-row jusitfy-content align-items ">
                    <Link href="/profile" >
                        <div className="flex flex-row justify-center gap-x-3 items-center ">
                            <div className="">
                                <Image src={Profile} width={30} alt="Home Icon">
                                </Image>
                            </div>
                            My Profile
                        </div>
                    </Link>
                </li>
            </ul>

        </div>

    )
}