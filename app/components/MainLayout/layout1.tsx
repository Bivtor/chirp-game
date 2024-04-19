import NavOptions from "./NavOptions"
import React, { useEffect, useState } from 'react'
import { UserValues } from "@/app/page"
import { getFirestore, collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { PostType } from '../Post/Post';
import NewPostForm, { NewPostValues } from "@/app/components/Game/NewPostForm";
import Feed from "@/app/components/Game/Feed"

const Layout1: React.FC<{ UserObject: UserValues }> = ({ UserObject }) => {
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
    const [showNewPostForm, setShowNewPostForm] = useState(false) // new post form or not
    const initialNewPostValues: NewPostValues = { message: '', username: UserObject.userName }

    useEffect(() => {
        let fetchedPosts: PostType[] = [] // array to set state as when finished populating
        const fetchStartingPosts = async () => {
            let c = 0; // counter for key

            // define collection
            const usersCollection = collection(db, 'users'); // users collection ref
            const usersSnapshot = await getDocs(usersCollection).then()

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
        fetchStartingPosts();
    }, []);

    const showNewPostHandler = () => {
        setShowNewPostForm(!showNewPostForm)
        // add the new post in another handler
    }

    const handleNewPostRequest = (values: NewPostValues) => {
        const newPost: PostType = {
            username: UserObject.userName,
            avatar: UserObject.avatar,
            message: values.message,
            time: new Timestamp(new Date().getUTCSeconds(), 0),
            key: posts[posts.length - 1].key + 1 // next key
        }

        setPosts((oldPosts) => [...oldPosts, newPost]) // add new post temporarily

        setShowNewPostForm(!showNewPostForm) // hide form
    }





    return (
        <div className="flex flex-row justify-between w-full flex-grow text-[color:var(--theme-text)]">
            {showNewPostForm && <div className="">
                <NewPostForm initialValues={initialNewPostValues} incomingSubmit={handleNewPostRequest} backButtonHandler={showNewPostHandler} userValues={UserObject} />

            </div>}
            <div className="flex-initial  min-w-48 border border-grey-400">
                <NavOptions FormValues={UserObject} NewPostClickHandler={showNewPostHandler} />
            </div>
            <div className="flex-initial w-full">
                <Feed posts={posts} />
            </div>
            <div className="flex-initial w-2/4 border border-400-purple flex flex-row justify-center">
                <div>
                    Trustometer
                </div>
            </div>
        </div>
    )
}

export default Layout1;
