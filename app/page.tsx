'use client'
import { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, getDocs, Timestamp, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import StartQuestions from "@/app/components/Game/Start";
import NavOptions from "@/app/components/MainLayout/NavOptions"
import NewPostForm, { NewPostValues } from "@/app/components/Game/NewPostForm";
import Trustometer from "@/app/components/Game/Trustometer";

import Feed from "@/app/components/Game/Feed"
import Notifications from "@/app/components/Notifications/NotificationsPage";
import MyProfilePage from "@/app/components/Profile/MyProfile";
import GeneralProfilePage from "@/app/components/Profile/GeneralProfile";

export interface ScoreInterace {
  score: number;
  interest: string;
  stage: number;
  notifications: number;
}

export interface PrimaryUserInterface {
  userName: string;
  avatar: string;
  interests: string;
  bio: string;
  following: Set<GeneralUserInterface>;
  follow_requests: Set<GeneralUserInterface>;
  score: ScoreInterace;
  posts: PostType[]
}

export interface GeneralUserInterface {
  userName: string;
  avatar: string;
  interests: string;
  bio: string;
  points: number;
  posts: PostType[]
}

export interface PostType {
  key: number;
  message: string;
  username: string;
  time: Timestamp;
  avatar: string;
}

export default function Home() {
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

  const [gameStarted, setGameStarted] = useState(false); // game start form
  const [showNewPostForm, setShowNewPostForm] = useState(false) // new post form
  const initialValues: PrimaryUserInterface = { userName: '', avatar: 'blue', interests: 'fashion', bio: '', following: new Set(), follow_requests: new Set(), score: { interest: '', notifications: 0, score: 100, stage: -1 }, posts: [] };
  const [user, setUser] = useState<PrimaryUserInterface>(initialValues)
  const initialNewPostValues: NewPostValues = { message: '', username: user.userName }
  const [feed, setFeed] = useState<PostType[]>([]) // all post data to display
  const [numPosts, setNumPosts] = useState(0) // used for Key
  const [shownProfile, setShownProfile] = useState<GeneralUserInterface>()
  const [middlePanelContent, setMiddlePanelContent] = useState('feed')

  useEffect(() => {


  }, [db, user.follow_requests, user.score.score]);


  const handleStartClick = (values: PrimaryUserInterface) => {
    setGameStarted(true)
    setUser(values)
  };


  const showNewPostHandler = () => {
    setShowNewPostForm(!showNewPostForm)
  }

  const handleNewPostRequest = (values: NewPostValues) => {
    const newPost: PostType = {
      key: numPosts,
      username: user.userName,
      avatar: user.avatar,
      message: values.message,
      time: new Timestamp(new Date().getUTCSeconds(), 0),
    }
    setNumPosts(numPosts + 1) // add to key counter
    setShowNewPostForm(!showNewPostForm) // hide form
    // TODO
    const newUser = user
    newUser.posts.push(newPost)
    setUser(newUser)
  }

  const getBotPosts = async (profile: GeneralUserInterface) => {
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

  const middlePanelDisplayHandler = async (show: string, profile?: GeneralUserInterface) => {
    // make sure 'shownprofile' is set to correct profile
    if (show == 'profile' && profile) {
      const botposts = await getBotPosts(profile!)
      profile.posts = botposts
      setShownProfile(profile)
    }

    setMiddlePanelContent(show) // set the home page content to the appropriate page

  }

  function startButtonHandler() {
    const u = user;
    u.score.stage = u.score.stage + 1
    setUser(u)
    user.score.score = user.score.score + 1;
    console.log("new stage: ", user.score.stage)
  }

  useEffect(
    () => {
      // get new follow requests when stage is updated
      const fetchAccounts = async (s: number) => {
        console.log('getting frs for stage: ', s)
        const usersCollection = collection(db, 'users') // users collection ref

        const initialQuery = query(usersCollection,
          where('stage', '==', s),
          where('interest', '==', user.score.interest)
        );

        const querySnapshot = await getDocs(initialQuery);
        const u = user;
        await Promise.all(querySnapshot.docs.map((doc) => {

          const data = doc.data()
          const fr: GeneralUserInterface = {
            points: data.points,
            userName: data.name,
            avatar: data.avatar,
            bio: data.bio,
            interests: data.interest,
            posts: []
          }

          // user.follow_requests.clear()
          u.follow_requests.add(fr)
        }))
        setUser(u)
        console.log('got FRs: ', u.follow_requests)
      }
      fetchAccounts(user.score.stage);


    },
    [user]
  )

  const gameLogicHandler = (result: GeneralUserInterface) => {
    // // Handle score change & add to user followers
    // if (result.accepted_request) {
    //   user.following.add(result.user)
    // }

    // // move to next game stage
    // // increment points appropriately
    // const newScore = score;
    // newScore.score = newScore.score + result.user.points
    // newScore.stage = newScore.stage + 1
    // setScore(newScore)

    // user.follow_requests.delete(result)
    // setShowNewPostForm(!showNewPostForm)
    // add the new post in another handler

    // move to next stage
  }

  return (
    <main className="text-[color:var(--theme-text)] h-screen">
      {gameStarted &&
        <div className="flex flex-row justify-between w-full text-[color:var(--theme-text)] w-full h-5/6">

          {showNewPostForm && <div className="z-40">
            <NewPostForm initialValues={initialNewPostValues} incomingSubmit={handleNewPostRequest} backButtonHandler={showNewPostHandler} userValues={user} />
          </div>}

          <div className="flex-initial min-w-52 border border-[var(--theme-accent)]">
            <NavOptions NewPostClickHandler={showNewPostHandler} handleChangeCenterPanelClick={middlePanelDisplayHandler} />
          </div>
          <div className="h-full w-full border border-[var(--theme-accent)]">
            {middlePanelContent == 'feed' && <Feed posts={feed} />}
            {middlePanelContent == 'notifications' && <Notifications handleAcceptDenyClick={gameLogicHandler} user={user} handleProfileClick={middlePanelDisplayHandler} />}
            {middlePanelContent == 'profile' && <GeneralProfilePage UserObject={shownProfile!} />}
            {middlePanelContent == 'myprofile' && <MyProfilePage UserObject={user} />}
          </div>
          <div className="flex w-2/4 border border-[var(--theme-accent)] flex flex-row justify-center">
            <Trustometer score={user.score} startButtonHandler={startButtonHandler} />
          </div>
        </div>}

      {!gameStarted && <div className="absolute top-1/4 right-auto w-1/2 h-1/2">
        <StartQuestions incomingSubmit={handleStartClick} initialValues={initialValues} />
      </div>}
    </main>
  );
}