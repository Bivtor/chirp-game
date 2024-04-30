import { GeneralUserInterface, PrimaryUserInterface } from '@/app/page'
import React from 'react'
import Notification from './Notification'

const Notifications: React.FC<{ handleAcceptDenyClick: (followee: GeneralUserInterface, decision: boolean) => void, user: PrimaryUserInterface, handleProfileClick: (show: string, ui?: GeneralUserInterface) => void }> = ({ handleAcceptDenyClick, user, handleProfileClick }) => {
    return (
        <div className='p-4 flex flex-col justify-center px-4 font-montserrat gap-3'>
            <h1 className='text-center text-lg'>
                Follow Requests
            </h1>
            <div>
                {user.follow_requests.size > 0 ? (
                    Array.from(user.follow_requests).map((fr) => (
                        <Notification user_from_requests={fr} key={fr.userName} handleProfileClick={handleProfileClick} handleAcceptDenyClick={handleAcceptDenyClick} />
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );

}

export default Notifications