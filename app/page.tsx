'use client'
import { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, getDocs, Timestamp, query, where, setDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";


import MidGame from "@/app/components/Game/MidGame";
import StartQuestions from "@/app/components/Game/Start";
import GameOver from "@/app/components/Game/GameOver";
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
  posts: PostType[];
  bias: boolean;  // true = good, false = bad 
}

export interface PostType {
  key: number;
  message: string;
  order: number;
  user: GeneralUserInterface;
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

  const [gameStarted, setGameStarted] = useState(false); // TODO set to false on push game start form 
  const [showNewPostForm, setShowNewPostForm] = useState(false) // new post form
  const initialValues: PrimaryUserInterface = { userName: 'sparrow', avatar: 'blue', interest: 'entertainment', feed: [], following: new Set(), follow_requests: new Set(), score: { notifications: 0, score: 100, stage: -1 }, posts: [] };
  const [user, setUser] = useState<PrimaryUserInterface>(initialValues)
  const [numPosts, setNumPosts] = useState(0) // used for Key
  const [shownProfile, setShownProfile] = useState<GeneralUserInterface>()
  const [middlePanelContent, setMiddlePanelContent] = useState('feed')
  const [gameOver, setgameOver] = useState(false)
  const [midGame, setShowMidGame] = useState(false)

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

    let c = 1;
    await Promise.all(querySnapshot.docs.map((doc2) => {
      const data = doc2.data()
      data.posts.forEach((post: string) => {
        const post_obj = {
          message: post,
          order: c,
          key: numPosts,
          user: profile
        } as PostType
        setNumPosts(numPosts + 1)
        postarray.push(post_obj)
        c++;
      })
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
  function trustStartButtonHandler() {
    const u = { ...user.score }; // shallow copy of obj 
    u.stage = u.stage + 1;
    setUser((oldUser) => ({ ...oldUser, score: u })) // update state to re-render new follow requests
    setShowMidGame(false)
    setShowTrustButton(false) // hide button
  }


  // fetch users of current stage when stage is updated
  useEffect(
    () => {
      // get new follow requests when stage(user) is updated

      const fetchAccounts = async (s: number) => {
        const usersCollection = collection(db, 'users') // users collection ref

        let initialQuery = query(usersCollection,
          where('stage', '==', s),
        );

        // hot fix for client request
        if (s == 0) {
          initialQuery = query(usersCollection,
            where('stage', '==', 1),
          );
        }
        // hot fix for client request
        if (s == 1) {
          initialQuery = query(usersCollection,
            where('stage', '==', 0),
            where('interest', '==', user.interest)
          );
        }

        const querySnapshot = await getDocs(initialQuery);
        const u = { ...user };
        await Promise.all(querySnapshot.docs.map((doc) => {
          const data = doc.data()
          const fr: GeneralUserInterface = {
            userName: data.name,
            avatar: data.avatar,
            bio: data.bio,
            interests: data.interest,
            bias: data.bias,
            posts: []
          }

          u.follow_requests.add(fr)
        }))
        setUser(u)
      }

      fetchAccounts(user.score.stage);
    },
    [user.score.stage]
  )


  const gameLogicHandler = (profile: GeneralUserInterface, decision: boolean) => {
    const following = new Set(user.following)
    const follow_requests = new Set(user.follow_requests)
    const newscore = { ...user.score }

    // delete follow request
    follow_requests.delete(profile)

    // If accepted request
    if (decision) {
      // add to followers 
      following.add(profile)

      // handle score update
      if (profile.bias) {
        if (user.score.score <= 180)
          newscore.score += 20
      } else {
        if (user.score.score >= 20)
          newscore.score -= 20
      }
    } else {
      // handle score update
      if (profile.bias) {
        if (user.score.score >= 20)
          newscore.score -= 20
      } else {
        if (user.score.score <= 180)
          newscore.score += 20
      }
    }


    // go to game over if we follow enough people
    if (user.following.size > 7) {
      setgameOver(true)
    }

    if (newscore.score == 0) {
      setgameOver(true)
    }



    // if on the last follow request
    if (user.follow_requests.size == 1) {
      // re-add next level button
      setTrustButtonText('See More Profiles')
      setShowTrustButton(true)
      if (newscore.score < 100 && user.score.stage > 0) {
        setShowMidGame(true)

      }
    }

    // TODO Update state of next button if follow requests is empty YESS

    // update user
    setUser((oldUser) => ({ ...oldUser, following: following, follow_requests: follow_requests, score: newscore }))
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
          feed2.push(post)
        })
      });
      setUser((oldUser) => ({ ...oldUser, feed: feed2 }))
    };

    fetchPosts()
  }, [user.following])


  return (
    <main className="h-full w-full pb-10">
      {gameStarted && !gameOver && !midGame &&
        (<div className="flex text-[color:var(--theme-text)]  h-full w-full px-4">
          <div className="w-1/5 md:border border-[var(--theme-accent)] rounded-lg h-full ">
            <NavOptions NewPostClickHandler={showNewPostHandler} handleChangeCenterPanelClick={middlePanelDisplayHandler} user={user} />
          </div>
          <div className="w-3/5 h-full md:border border-[var(--theme-accent)] rounded-lg overflow-y-scroll">
            {middlePanelContent == 'feed' && <Feed posts={user.feed} handleProfileClick={middlePanelDisplayHandler} />}
            {middlePanelContent == 'notifications' && <Notifications handleAcceptDenyClick={gameLogicHandler} user={user} handleProfileClick={middlePanelDisplayHandler} />}
            {middlePanelContent == 'profile' && <GeneralProfilePage UserObject={shownProfile!} handleBackClick={middlePanelDisplayHandler} />}
            {middlePanelContent == 'myprofile' && <MyProfilePage UserObject={user} />}
          </div>
          <div className="flex w-1/5 md:border border-[var(--theme-accent)] flex flex-row justify-center rounded-lg">
            <Trustometer score={user.score} startButtonHandler={trustStartButtonHandler} showButton={showTrustButton} buttonText={trustButtonText} />
          </div>
        </div>)}

      {!gameStarted && (<div className="absolute top-1/4 right-1/4 w-1/2 h-1/2">
        <StartQuestions incomingSubmit={handleStartClick} initialValues={initialValues} />
      </div>)}

      {gameOver && (
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2">
          <GameOver usr={user} />
        </div>
      )}

      {midGame && (
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2">
          <MidGame usr={user} trustStartButtonHandler={trustStartButtonHandler} />
        </div>
      )}

    </main>
  );
}