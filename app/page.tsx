'use client'
import { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, getDocs, Timestamp, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";

import StartQuestions from "@/app/components/Game/Start";
import NavOptions from "@/app/components/MainLayout/NavOptions"

import Trustometer from "@/app/components/Game/Trustometer";
import Feed from "@/app/components/Game/Feed"
import Notifications from "@/app/components/Notifications/NotificationsPage";
import MyProfilePage from "@/app/components/Profile/MyProfile";
import GeneralProfilePage from "@/app/components/Profile/GeneralProfile";

export interface ScoreInterace {
  score: number;
  stage: number;
  notifications: number;
}

export interface PrimaryUserInterface {
  userName: string;
  avatar: string;
  interest: string;
  bio: string;
  following: Set<GeneralUserInterface>;
  follow_requests: Set<GeneralUserInterface>;
  score: ScoreInterace;
  posts: PostType[]
  feed: PostType[]
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
  const initialValues: PrimaryUserInterface = { userName: '', avatar: 'blue', interest: 'fashion', bio: '', feed: [], following: new Set(), follow_requests: new Set(), score: { notifications: 0, score: 100, stage: -1 }, posts: [] };
  const [user, setUser] = useState<PrimaryUserInterface>(initialValues)
  const [numPosts, setNumPosts] = useState(0) // used for Key
  const [shownProfile, setShownProfile] = useState<GeneralUserInterface>()
  const [middlePanelContent, setMiddlePanelContent] = useState('feed')

  const handleStartClick = (values: PrimaryUserInterface) => {
    setGameStarted(true)
    setUser(values)
  };

  const showNewPostHandler = () => {
    setShowNewPostForm(!showNewPostForm)
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

    // Now we can query or perform operations on the "posts" subcollection
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

  // states of trust tab
  const [showTrustButton, setShowTrustButton] = useState(true)
  const [trustButtonText, setTrustButtonText] = useState('Start')

  // handle game state from Trustworthiness tab
  function startButtonHandler() {
    const u = { ...user.score }; // shallow copy of obj 
    u.stage = u.stage + 1;
    setUser((oldUser) => ({ ...oldUser, score: u })) // update state to re-render new follow requests
    setShowTrustButton(false) // hide button
  }


  // fetch users of current stage when stage is updated
  useEffect(
    () => {
      // get new follow requests when stage(user) is updated

      const fetchAccounts = async (s: number) => {
        const usersCollection = collection(db, 'users') // users collection ref

        const initialQuery = query(usersCollection,
          where('stage', '==', s),
          where('interest', '==', user.interest)
        );

        const querySnapshot = await getDocs(initialQuery);
        const u = { ...user };
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

          u.follow_requests.add(fr)
        }))
        setUser(u)
      }

      fetchAccounts(user.score.stage);
    },
    [user.score]
  )


  const gameLogicHandler = (profile: GeneralUserInterface, decision: boolean) => {
    const following = new Set(user.following)
    const follow_requests = new Set(user.follow_requests)

    // delete follow request
    follow_requests.delete(profile)

    // If accepted request
    if (decision) {
      // add to followers 
      following.add(profile)
    }

    // if on the last follow request
    if (user.follow_requests.size == 1) {
      // re-add next level button
      setTrustButtonText('See More Profiles')
      setShowTrustButton(true)
    }

    // TODO Update state of next button if follow requests is empty YESS

    // update user
    setUser((oldUser) => ({ ...oldUser, following: following, follow_requests: follow_requests }))
  }

  // Update feed when user.following is changed
  useEffect(() => {

    const fetchPosts = async () => {
      // create new feed object
      const feed2: PostType[] = []

      // Array to store promises
      const promises: Promise<PostType[]>[] = [];

      // Iterate through each item in 'user.following'
      user.following.forEach((item) => {
        // Push the promise returned by getBotPosts to the 'promises' array
        promises.push(getBotPosts(item));
      });

      // Wait for all promises to resolve
      const resolvedPosts = await Promise.all(promises);

      // Process the resolved posts
      resolvedPosts.forEach((bot) => {
        bot.forEach((post) => {
          console.log(post)
          feed2.push(post)
        })
      });
      setUser((oldUser) => ({ ...oldUser, feed: feed2 }))
    };

    fetchPosts()
  }, [user.following])


  return (
    <main className="text-[color:var(--theme-text)] h-screen">
      {gameStarted &&
        <div className="flex flex-row justify-between w-full text-[color:var(--theme-text)] w-full h-5/6">
          <div className="flex-initial min-w-52 border border-[var(--theme-accent)]">
            <NavOptions NewPostClickHandler={showNewPostHandler} handleChangeCenterPanelClick={middlePanelDisplayHandler} user={user} />
          </div>
          <div className="h-full w-full border border-[var(--theme-accent)]">
            {middlePanelContent == 'feed' && <Feed posts={user.feed} handleProfileClick={middlePanelDisplayHandler} />}
            {middlePanelContent == 'notifications' && <Notifications handleAcceptDenyClick={gameLogicHandler} user={user} handleProfileClick={middlePanelDisplayHandler} />}
            {middlePanelContent == 'profile' && <GeneralProfilePage UserObject={shownProfile!} />}
            {middlePanelContent == 'myprofile' && <MyProfilePage UserObject={user} />}
          </div>
          <div className="flex w-2/4 border border-[var(--theme-accent)] flex flex-row justify-center">
            <Trustometer score={user.score} startButtonHandler={startButtonHandler} showButton={showTrustButton} buttonText={trustButtonText} />
          </div>
        </div>}

      {!gameStarted && <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2">
        <StartQuestions incomingSubmit={handleStartClick} initialValues={initialValues} />
      </div>}
    </main>
  );
}