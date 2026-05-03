import { Link, NavLink } from "react-router-dom";
import {
    LuEarth,
    LuEllipsis,
    LuThumbsUp,
    LuRepeat2,
    LuMessageCircle,
    LuShare2,
} from "react-icons/lu";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import axios from "axios";
import CommentCard from "../CommentCard/CommentCard";
import PostMessage from "../PostMessage/PostMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateComment from "../CreateComment/CreateComment";
import PostActionsBtn from "../PostActionsBtn/PostActionsBtn";
import { toast } from "react-toastify";

// dayjs plugins
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
    relativeTime: {
        future: "in %s",
        past: "%s",
        s: "%ds",
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "1mo",
        MM: "%dmo",
        y: "1y",
        yy: "%dy",
    },
});

const myName = localStorage.getItem('loginName')
const myPohto = localStorage.getItem('loginPhoto')

export default function PostCard({ postInfo, isPostDetailsPage = false }) {
    const { userToken, userId } = useContext(authContext);

    const {
        id: postId,
        user,
        body,
        commentsCount,
        createdAt,
        image,
        likesCount,
        privacy,
        sharesCount,
        topComment,
    } = postInfo;
    console.log(postInfo)
    const { name, username, photo, _id: postCreatorId } = user;
    const [showAllComments, setShowAllComments] = useState(false);
    const queryClient = useQueryClient();

    // Fetch comments
    const getPostComments = async () => {
        const res = await axios.get(
            `https://route-posts.routemisr.com/posts/${postId}/comments`,
            {
                headers: { token: userToken },
            }
        );

        return res.data.data.comments;
    };

    const {
        data: postComments = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["postComments", postId],
        queryFn: getPostComments,
    });


    function handleDeletePostCard() {

        return axios.delete(`https://route-posts.routemisr.com/posts/${postId}`, {
            headers: { token: userToken },
        })
    }

    const { mutate: deletePostMutate } = useMutation({
        mutationFn: handleDeletePostCard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCommunityPosts'] });
            toast.success('Post deleted successfully.', {

                autoClose: 2000,
                closeOnClick: true,
            })
        },
        onError: () => {

            toast.error('Error occurred , please try again.', {

                autoClose: 2000,
                closeOnClick: true,
            })
        }
    });

    // if isPostDetailsPage
    useEffect(() => {
        if (isPostDetailsPage) {
            setShowAllComments(true);
            refetch();
        }
    }, [isPostDetailsPage]);

    // update post 

    const [isEditing, setIsEditing] = useState(false);
    const [editedBody, setEditedBody] = useState(body);
    const [editedImage, setEditedImage] = useState(null);

    const { mutate: updatePost, isPending: isUpdating } = useMutation({
        mutationFn: async () => {
            const formData = new FormData();
            formData.append("body", editedBody);

            if (editedImage) {
                formData.append("image", editedImage);
            }

            return axios.put(
                `https://route-posts.routemisr.com/posts/${postId}`,
                formData,
                {
                    headers: { token: userToken },
                }
            );
        },
        onSuccess: () => {
            toast.success("Post updated successfully");
            setIsEditing(false);
            queryClient.invalidateQueries({ queryKey: ['getCommunityPosts'] });
        },
        onError: () => {
            toast.error("Failed to update post");
        }
    });

    // Loading / Error (بعد كل الـ hooks)
    /*
    
        if (isLoading) {
        return <PostMessage message="Loading..." />;
    }

    */
    if (isError) {
        return <PostMessage message="No comments found." />;
    }

    return (
        <article className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="p-4">
                <div className="flex items-center gap-3">
                    <NavLink to="/profile" className="shrink-0">
                        <img
                            src={photo}
                            alt={name}
                            className="h-11 w-11 rounded-full object-cover"
                        />
                    </NavLink>

                    <div className="min-w-0 flex-1">
                        <NavLink
                            to="/profile"
                            className="truncate text-sm font-bold text-foreground hover:underline"
                        >
                            {name}
                        </NavLink>

                        <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                            <span>@{username}</span>
                            <span>·</span>

                            <button className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-700 hover:underline">
                                {dayjs(createdAt).fromNow()}
                            </button>

                            <span>·</span>

                            <button className="cursor-pointer inline-flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-slate-100">
                                <LuEarth size={12} />
                                {privacy}
                            </button>
                        </div>
                    </div>


                    {userId === postCreatorId && (
                        <PostActionsBtn
                            onDelete={() => deletePostMutate()}
                            onUpdate={() => setIsEditing(true)}
                            btnType="post"
                        />
                    )}

                </div>

                {/* Content */}
                <div className="mt-3">


                    {isEditing ? (
                        <div className="mt-3 flex flex-col gap-2">
                            <textarea
                                className="w-full border rounded px-3 py-2"
                                value={editedBody}
                                onChange={(e) => setEditedBody(e.target.value)}
                            />
                            <input
                                type="file"
                                onChange={(e) => setEditedImage(e.target.files[0])}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => updatePost()}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    {isUpdating ? "Saving..." : "Save"}
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-300 px-3 py-1 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                            {body}
                        </p>
                    )}



                </div>
            </div>

            {/* Image */}
            {image && (
                <div className="max-h-155 overflow-hidden border-y border-slate-200">
                    <button
                        type="button"
                        className="group relative block w-full cursor-zoom-in"
                    >
                        <img src={image} alt="post" className="w-full object-cover" />
                        <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10"></span>
                    </button>
                </div>
            )}

            {/* Stats */}
            <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
                            <LuThumbsUp size={12} />
                        </span>
                        <span className="font-semibold">{likesCount} likes</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
                        <span className="inline-flex items-center gap-1">
                            <LuRepeat2 size={13} />
                            {sharesCount} shares
                        </span>
                        <span>{commentsCount} comments</span>

                        {!isPostDetailsPage && (
                            <Link
                                to={`/post/${postId}`}
                                className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]"
                            >
                                View details
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-4 border-t border-slate-200"></div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-1 p-1">
                <button className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                    <LuThumbsUp size={18} />
                    Like
                </button>

                <button onClick={() => {
                    setShowAllComments((prev) => !prev); // toggle
                    if (!showAllComments) refetch();
                }}
                    className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                    <LuMessageCircle size={18} />
                    Comment
                </button>

                <button className="flex items-center justify-center gap-2 rounded-md p-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                    <LuShare2 size={18} />
                    Share
                </button>
            </div>

            {/* Top Comment */}
            {topComment && !showAllComments && !isPostDetailsPage && (
                <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                        Top Comment
                    </p>

                    <div className="flex items-start gap-2">
                        <img
                            src={topComment.commentCreator.photo}
                            alt={topComment.commentCreator.name}
                            className="h-8 w-8 rounded-full object-cover"
                        />

                        <div className="min-w-0 flex-1 rounded-2xl bg-white px-3 py-2">
                            <p className="truncate text-xs font-bold text-slate-900">
                                {topComment.commentCreator.name}
                            </p>
                            <p className="mt-0.5 text-sm text-slate-700">
                                {topComment.content}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setShowAllComments(true);
                            refetch();
                        }}
                        className="mt-2 text-xs font-bold text-[#1877f2] hover:underline"
                    >
                        View all comments
                    </button>
                </div>
            )}



            {/* All Comments */}
            {(showAllComments || isPostDetailsPage) && (
                <div className="space-y-2 px-4 pb-4">
                    {postComments.map((comment) => (
                        <CommentCard key={comment._id} comment={comment} postCreatorId={postCreatorId} />
                    ))}

                    <div className="mt-3">

                        <CreateComment userName={myName} userPhoto={myPohto} postId={postId} queryKey={["postComments", postId]} />

                    </div>


                </div>
            )}
        </article>
    );
}