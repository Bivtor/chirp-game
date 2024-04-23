import { GeneralUserInterface, PrimaryUserInterface } from '@/app/page'
import React from 'react'
import Notification from './Notification'

const Notifications: React.FC<{ handleAcceptDenyClick: (followee: GeneralUserInterface, decision: boolean) => void, user: PrimaryUserInterface, handleProfileClick: (show: string, ui?: GeneralUserInterface) => void }> = ({ handleAcceptDenyClick, user, handleProfileClick }) => {
    return (
        <div className='flex flex-col justify-center p-4 gap-3 font-montserrat'>
            <h1 className='text-center text-lg'>
                Notifications
            </h1>
            <div>
                {user.follow_requests.size > 0 ? (
                    Array.from(user.follow_requests).map((fr) => (
                        <Notification user_from_requests={fr} key={fr.userName} handleProfileClick={handleProfileClick} handleAcceptDenyClick={handleAcceptDenyClick} />
                    ))
                ) : (
                    <div>No follow requests</div>
                )}
            </div>
        </div>
    );

}

export default Notifications