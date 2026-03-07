import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard';
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import PostMessage from '../PostMessage/PostMessage';
import LoadingCard from '../LoadingCard/LoadingCard';


export default function Home() {

    const { userToken } = useContext(authContext);
    //const [homePosts, setHomePosts] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);


    function getHomePosts() {

        return axios.get(`https://route-posts.routemisr.com/posts/feed`, {
            params: {
                only: "following",
                limit: 10,
            },
            headers: { token: userToken }
        })

    }

    {/*
    
     useEffect(() => {

        getHomePosts();
    }, []);

    */}


    const queryObj = useQuery({

        queryKey: ['getHomePosts'],
        queryFn: getHomePosts
    })

    const { data, isLoading, isError } = queryObj;

    if (isLoading) {

        return <>
            <LoadingCard />
            <LoadingCard />
        </>
    }

    if (isError) {

        return <h3>Error please try again</h3>
    }

    const homePosts = data.data.data.posts;

    if (homePosts.length === 0) {

        return <PostMessage message={'No posts yet. Be the first one to publish.'} />

    }


    return (
        <div className='space-y-4'>

            {homePosts.map(post => <PostCard key={post.id} postInfo={post} />)}

        </div>
    )
}

{/*
    
   .then(function (resp) {

                console.log(resp.data.data.posts);
                setHomePosts(resp.data.data.posts);
            })
            .catch(function (error) {

                console.log(error.message);
                setIsError(true);
            })
            .finally(function () {

                setIsLoading(false);

            })  
    
    */}