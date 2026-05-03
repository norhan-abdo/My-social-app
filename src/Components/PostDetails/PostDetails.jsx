import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { authContext } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import PostCard from '../PostCard/PostCard';
import { FaArrowLeft } from "react-icons/fa";
import PostMessage from '../PostMessage/PostMessage';


export default function PostDetails() {
    const navigate = useNavigate();

    const { userToken } = useContext(authContext);

    const { id } = useParams();

    function getPostDetails() {


        return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {

            headers: { token: userToken }
        })
    }

    const queryObj = useQuery({

        queryKey: ['getPostDetails', id],
        queryFn: getPostDetails
    })

    const { data, isLoading, isError } = queryObj;


    if (isLoading) {

        return <div className="mx-auto max-w-3xl space-y-4">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
            >
                <FaArrowLeft size={16} />
                Back
            </button>
            <PostMessage message={'Loading...'} />

        </div>

    }

    if (isError) {

        return <div className="mx-auto max-w-3xl space-y-4">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
            >
                <FaArrowLeft size={16} />
                Back
            </button>
            <PostMessage message={'Post not Found'} />

        </div>
    }

    const postDetails = data.data.data.post;

    console.log(postDetails)
    return (

        <>
            <div className="mx-auto max-w-3xl space-y-4">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
                >
                    <FaArrowLeft size={16} />
                    Back
                </button>
                <PostCard postInfo={postDetails} isPostDetailsPage={true} />

            </div>
        </>

    )
}
