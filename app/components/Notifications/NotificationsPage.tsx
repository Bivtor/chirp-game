import { FollowRequestInterface, UserInterface } from '@/app/page'
import React from 'react'
import Notification from './Notification'

const Notifications: React.FC<{ handleAcceptDenyClick: (result: FollowRequestInterface) => void, user: UserInterface, handleProfileClick: (show: string, ui?: UserInterface) => void }> = ({ handleAcceptDenyClick, user, handleProfileClick }) => {
    return (
        <div className='flex flex-col justify-center p-4 gap-3'>
            <h1 className='text-center text-lg'>
                Notifications
            </h1>
            <div>
                {user.follow_requests.size > 0 ? (
                    Array.from(user.follow_requests).map((fr) => (
                        <Notification user_from_requests={fr} key={fr.user.userName} handleProfileClick={handleProfileClick} handleAcceptDenyClick={handleAcceptDenyClick} />
                    ))
                ) : (
                    <div>No follow requests</div>
                )}
            </div>
        </div>
    );

}

export default Notifications