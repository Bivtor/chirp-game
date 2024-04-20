import NavOptions from "./NavOptions"
import React, { useEffect, useState } from 'react'
import { UserInterface, FollowRequestInterface } from "@/app/page"
import { getFirestore, collection, addDoc, getDocs, Timestamp, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { PostType } from '../Post/Post';
import NewPostForm, { NewPostValues } from "@/app/components/Game/NewPostForm";
import Trustometer, { ScoreInterace } from "../Game/Trustometer";

import Feed from "@/app/components/Game/Feed"
import Notifications from "@/app/components/Notifications/NotificationsPage";
import ProfilePage from "../Profile/Profile";

const Layout1: React.FC<{ UserObject: UserInterface }> = ({ UserObject }) => {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: "chirp-game.firebaseapp.com",
        projectId: "chirp-game",
        storageBucket: "chirp-game.appspot.com",
        messagingSenderId: "754127665615",
        appId: "1:754127665615:web:0c05f8fae1e2f5594dbaba",
        measurementId: "G-G0CLYP3YNP"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const [posts, setPosts] = useState<PostType[]>([]) // all post data to display
    const [visibleProfilePosts, setVisibleProfilePosts] = useState<PostType[]>([])
    const [myPosts, setMyPosts] = useState<PostType[]>([]) // My Posts
    const [showNewPostForm, setShowNewPostForm] = useState(false) // new post form or not
    const initialNewPostValues: NewPostValues = { message: '', username: UserObject.userName }
    const initialScore: ScoreInterace = { interest: UserObject.interests, score: 100, stage: 0, notifications: 1 }
    const [numPosts, setNumPosts] = useState(0)
    const [score, setScore] = useState<ScoreInterace>(initialScore)
    const [currentProfile, setCurrentProfile] = useState<UserInterface>(UserObject)
    const [middlePanelContent, setMiddlePanelContent] = useState("feed")


    useEffect(() => {
        let fetchedPosts: PostType[] = [] // array to set state as when finished populating
        const currentUsers: FollowRequestInterface[] = []

        const fetchStartingAccounts = async () => {
            // let c = 0; // counter for key
            const usersCollection = collection(db, 'users') // users collection ref

            const initialQuery = query(usersCollection,
                where('stage', '==', 0),
                where('interest', '==', score.interest)
            );


            const querySnapshot = await getDocs(initialQuery);
            await Promise.all(querySnapshot.docs.map((doc) => {
                const data = doc.data()
                const fr: FollowRequestInterface = {
                    accepted_request: false,
                    user: {
                        points: data.points,
                        isPrimaryUser: false,
                        userName: data.name,
                        avatar: data.avatar,
                        bio: data.bio,
                        follow_requests: new Set(),
                        following: new Set(),
                        interests: data.interest
                    }
                }
                // Clear is ok because this should only contain the one request associated with the first bird option
                UserObject.follow_requests.clear()
                UserObject.follow_requests.add(fr)
            }))
        }

        const fetchStartingPosts = async () => {
            let c = 0; // counter for key

            // define collection
            const usersCollection = collection(db, 'users'); // users collection ref
            const usersSnapshot = await getDocs(usersCollection)

            // iterate through documents in snapshot
            await Promise.all(usersSnapshot.docs.map(async (doc) => {
                setPosts([]) // clear posts in case of repeat fires 
                const data = doc.data() // data from user doc
                const postsCollection = collection(db, 'users', doc.id, 'posts'); // posts collection ref
                const postsSnapshot = await getDocs(postsCollection); // posts collection snapshot

                await Promise.all(postsSnapshot.docs.map((doc2) => {
                    const data2 = doc2.data() // console.log(doc2.id, " => ", doc2.data())

                    const post_obj = {
                        key: c,
                        username: data.name,
                        avatar: data.avatar,
                        message: data2.message,
                        time: data2.time
                    } as PostType
                    fetchedPosts.push(post_obj) // add 
                    c++; // increment counter
                }))
            }))
            setPosts(fetchedPosts)
        }

        // fetchStartingPosts();
        fetchStartingAccounts();
    }, [db, UserObject.follow_requests, score.interest]);

    useEffect(() => {
    }, [UserObject.following])

    const showNewPostHandler = () => {
        setShowNewPostForm(!showNewPostForm)
    }

    const handleNewPostRequest = (values: NewPostValues) => {
        const newPost: PostType = {
            key: numPosts,
            username: UserObject.userName,
            avatar: UserObject.avatar,
            message: values.message,
            time: new Timestamp(new Date().getUTCSeconds(), 0),
        }
        setNumPosts(numPosts + 1)
        setShowNewPostForm(!showNewPostForm) // hide form
        setMyPosts((oldPosts) => [...oldPosts, newPost]) // add new post temporarily
    }

    const getBotPosts = async (profile: UserInterface) => {
        const postarray: PostType[] = []
        const usersCollection = collection(db, 'users') // users collection ref

        const postQuery = query(usersCollection,
            where('name', '==', profile.userName)
        );

        const querySnapshot = await getDocs(postQuery);
        const userDocRef = querySnapshot.docs[0].ref;
        const postsCollection = collection(userDocRef, 'posts'); // posts subcollection ref

        // Now you can query or perform operations on the "posts" subcollection
        // For example:
        const postsQuerySnapshot = await getDocs(postsCollection);
        await Promise.all(postsQuerySnapshot.docs.map((doc2) => {
            const data = doc2.data()
            const post_obj = {
                username: profile.userName,
                avatar: profile.avatar,
                message: data.message,
                time: new Timestamp(1000, 0),
                key: numPosts
            } as PostType

            setNumPosts(numPosts + 1)
            postarray.push(post_obj)
            console.log(post_obj)
        }))
        return postarray
    }

    const middlePanelDisplayHandler = async (show: string, profile?: UserInterface) => {
        if (show == 'profile') {
            console.log("show new profile")
            setVisibleProfilePosts([]) // clear visible posts
            setCurrentProfile(profile!) // set visible profile to incoming profile (mine or another)

            // alter what is passed to Profile in 'VisibleProfilePosts' state
            // if looking at my own profile
            if (profile!.isPrimaryUser) {
                setVisibleProfilePosts(myPosts)
            }

            // if looking at another profile
            else {
                const botposts = await getBotPosts(profile!)
                setVisibleProfilePosts(botposts)
            }
        }
        setMiddlePanelContent(show) // set the home page content to the appropriate page
    }

    useEffect(() => {
        // TODO make this get all of the posts from the people that we are following
        // use setPosts

    }, [UserObject.following])

    const gameLogicHandler = (result: FollowRequestInterface) => {
        // Handle score change & add to user followers
        if (result.accepted_request) {
            UserObject.following.add(result.user)
        }

        // move to next game stage
        // increment points appropriately
        const newScore = score;
        newScore.score = newScore.score + result.user.points
        newScore.stage = newScore.stage + 1
        setScore(newScore)



        // setShowNewPostForm(!showNewPostForm)
        // add the new post in another handler

        // move to next stage



    }



    return (
        <div className="flex flex-row justify-between w-full text-[color:var(--theme-text)] w-full h-5/6">
            {showNewPostForm && <div>
                <NewPostForm initialValues={initialNewPostValues} incomingSubmit={handleNewPostRequest} backButtonHandler={showNewPostHandler} userValues={UserObject} />

            </div>}
            <div className="flex-initial  min-w-52 border border-grey-400">
                <NavOptions FormValues={UserObject} NewPostClickHandler={showNewPostHandler} handleChangeCenterPanelClick={middlePanelDisplayHandler} />
            </div>
            <div className="h-full w-full">
                {middlePanelContent == 'feed' && <Feed posts={posts} />}
                {middlePanelContent == 'notifications' && <Notifications handleAcceptDenyClick={gameLogicHandler} user={UserObject} handleProfileClick={middlePanelDisplayHandler} />}
                {middlePanelContent == 'profile' && <ProfilePage UserObject={currentProfile} MyPosts={visibleProfilePosts} />}
            </div>
            <div className="flex w-2/4 border border-400-purple flex flex-row justify-center">
                <Trustometer score={score} />
            </div>
        </div>
    )
}

export default Layout1;
