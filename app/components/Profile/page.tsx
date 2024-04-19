'use client'
import React, { useEffect, useState } from 'react'
import { UserValues } from '../../page'

const ProfilePage: React.FC<{ UserObject: UserValues }> = ({ UserObject }) => {
    const [userData, setUserData] = useState<UserValues>({ avatar: '', bio: '', interests: '', userName: '' }) // new post form or not

    useEffect(() => {
        const user = sessionStorage.getItem("username");
        const bio = sessionStorage.getItem("bio");
        const avatar = sessionStorage.getItem("avatar");
        console.log("user: ", user, " bio: ", bio, "avatar: ", avatar);

        const uv: UserValues = { avatar: avatar!, bio: bio!, userName: user!, interests: 'fashion' }
        setUserData(uv)
        console.log("ud: ",)
    }, [])

    return (
        <div>
            hi hi hi

            {userData?.avatar}
            {userData?.bio}
            {userData?.interests}
            {userData?.userName}


        </div>

    )
}
export default ProfilePage