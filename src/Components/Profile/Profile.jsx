import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, Mail, FileText, Bookmark } from "lucide-react";
import { authContext } from "../../context/AuthContext";
import axios from "axios";
import MyPostCard from "../myPostCard/myPostCard";

function formatPostDate(isoDate) {
    const date = new Date(isoDate);

    // خيارات الشكل اللي عايزاه
    return date.toLocaleString("en-US", {
        month: "short",    // Mar
        day: "numeric",    // 2
        hour: "numeric",   // 1
        minute: "2-digit", // 07
        hour12: true       // AM/PM
    });
}

export default function Profile() {
    const [activeTab, setActiveTab] = useState("posts");
    const { userToken } = useContext(authContext);

    // ----- Query 1: profile -----
    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ["profile", userToken],
        queryFn: () =>
            axios.get("https://route-posts.routemisr.com/users/profile-data", {
                headers: { token: userToken },
            }),
    });

    // ----- Query 2: myPosts -----
    const myId = user?.data?.data?.user?.id;

    const { data: myPosts } = useQuery({
        queryKey: ["myPosts", myId],
        queryFn: () =>
            axios.get(`https://route-posts.routemisr.com/users/${myId}/posts`, {
                headers: { token: userToken },
            }),
        enabled: !!myId,
    });

    // ----- Conditional rendering -----
    if (isLoading)
        return <p className="text-center mt-10 text-lg font-semibold">Loading...</p>;

    if (isError)
        return (
            <p className="text-center mt-10 text-red-500">{error.message}</p>
        );

    // ----- Destructuring user data -----
    const {
        name,
        username,
        photo,
        email,
        bookmarksCount,
        followingCount,
        followersCount,
        posts,
        bookmarks,
    } = user.data.data.user;

    return (
        <div className="space-y-5 sm:space-y-6">
            {/* ----- Profile Section ----- */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-52 bg-linear-to-r from-slate-900 to-blue-700" />
                <div className="relative -mt-16 px-4 pb-6 sm:px-8">
                    <div className="rounded-3xl bg-white p-6">
                        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                            {/* User Info */}
                            <div className="flex items-end gap-4">
                                <img
                                    src={photo}
                                    alt={name}
                                    className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                                />
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900">{name}</h2>
                                    <p className="text-lg font-semibold text-slate-500">@{username}</p>
                                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                        <Users size={13} />
                                        Route Posts member
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid w-full grid-cols-3 gap-2 lg:w-96">
                                <StatBox title="Followers" value={followersCount} />
                                <StatBox title="Following" value={followingCount} />
                                <StatBox title="Bookmarks" value={bookmarksCount} />
                            </div>
                        </div>

                        {/* About & Small Stats */}
                        <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <h3 className="text-sm font-extrabold text-slate-800">About</h3>
                                <div className="mt-3 space-y-2 text-sm text-slate-600">
                                    <p className="flex items-center gap-2">
                                        <Mail size={15} /> {email}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <SmallStat title="My posts" value={myPosts?.data?.data?.posts?.length} />
                                <SmallStat title="Saved posts" value={bookmarksCount} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ----- Tabs ----- */}
            <section className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="inline-flex rounded-xl bg-slate-100 p-1">
                        <button
                            onClick={() => setActiveTab("posts")}
                            className={`px-4 py-2 text-sm font-bold rounded-lg ${activeTab === "posts" ? "bg-white text-blue-600 shadow" : "text-slate-600"
                                }`}
                        >
                            <FileText size={15} className="inline mr-1" />
                            My Posts
                        </button>

                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`px-4 py-2 text-sm font-bold rounded-lg ${activeTab === "saved" ? "bg-white text-blue-600 shadow" : "text-slate-600"
                                }`}
                        >
                            <Bookmark size={15} className="inline mr-1" />
                            Saved
                        </button>
                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-600">
                        {activeTab === "posts"
                            ? myPosts?.data?.data?.posts?.length || 0
                            : bookmarks?.length || 0}
                    </span>
                </div>

                <div>

                    <div className="space-y-3">

                        {activeTab === "posts" &&
                            myPosts?.data?.data?.posts?.map((post) => (

                                <MyPostCard key={post._id}
                                    name={post.user.name}
                                    username={post.user.username}
                                    photo={post.user.photo}
                                    body={post.body}
                                    postImage={post.image}
                                    likes={post.likesCount}
                                    shares={post.sharesCount}
                                    comments={post.commentsCount}
                                    timestamp={formatPostDate(post.createdAt)}
                                    postId={post._id}
                                />
                            ))}
                    </div>
                    <div className="space-y-3">
                        {activeTab === "saved" &&
                            bookmarks?.map((post) => (
                                <div key={post._id} className="mb-3 rounded-xl border p-3">
                                    No Posts Fouund
                                </div>
                            ))}

                    </div>
                </div>
            </section>
        </div>
    );
}

/* ----- Small UI pieces ----- */
function StatBox({ title, value }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
            <p className="text-xs font-bold uppercase text-slate-500">{title}</p>
            <p className="mt-1 text-2xl font-black text-slate-900">{value || 0}</p>
        </div>
    );
}

function SmallStat({ title, value }) {
    return (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3">
            <p className="text-xs font-bold uppercase text-blue-700">{title}</p>
            <p className="mt-1 text-2xl font-black text-slate-900">{value || 0}</p>
        </div>
    );
}