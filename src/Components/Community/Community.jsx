import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { authContext } from '../../context/AuthContext';
import PostCard from '../PostCard/PostCard';
import { useQuery } from '@tanstack/react-query';
import PostMessage from '../PostMessage/PostMessage';
import LoadingCard from '../LoadingCard/LoadingCard';

export default function Community() {

    const { userToken } = useContext(authContext);
    // const [communityPosts, setCommunityPosts] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false)


    function getCommunityPosts() {

        return axios.get(`https://route-posts.routemisr.com/posts?sort=-createdAt`, {

            headers: { token: userToken }
        })

    }


    const queryObj = useQuery({

        queryKey: ['getCommunityPosts'],
        queryFn: getCommunityPosts
    })

    const { data, isLoading, isError } = queryObj

    if (isLoading) {

        return <>
            <LoadingCard />
            <LoadingCard />
        </>
    }

    if (isError) {

        return <PostMessage message={'No posts yet. Be the first one to publish.'} />
    }

    const communityPosts = data.data.data.posts;

    return (
        <div className='space-y-4'>

            {communityPosts.map(post => <PostCard key={post.id} postInfo={post} />)}

        </div>
    )
}

{/*
    
   .then(function (resp) {

                console.log(resp.data.data.posts);
                setCommunityPosts(resp.data.data.posts);
            })
            .catch(function (error) {

                console.log(error.message);
                setIsError(true);
            })
            .finally(function () {

                setIsLoading(false);

            })  
    */}