import React from 'react'
import { Link } from 'react-router-dom';

export default function MyPostCard({
    name,
    username,
    photo,
    body,
    postImage,
    postId,
    likes = 0,
    shares = 0,
    comments = 0,
    timestamp,
    onViewDetails,

}) {
    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_6px_rgba(15,23,42,.05)] transition hover:shadow-sm">
            <div className="p-4">
                {/* User info */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                        <img
                            alt={name}
                            className="h-10 w-10 rounded-full object-cover"
                            src={photo}
                        />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-extrabold text-slate-900">{name}</p>
                            <p className="truncate text-xs font-semibold text-slate-500">@{username}</p>
                        </div>
                    </div>
                    <Link to={`/post/${postId}`}
                        className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] transition hover:bg-[#e7f3ff]"
                    >
                        View details
                    </Link>
                </div>

                {/* Post body */}
                <div className="pt-3">
                    <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800">{body}</p>
                </div>
            </div>

            {/* Post image */}
            {postImage && (
                <div className="border-y border-slate-200 bg-slate-950/95">
                    <button type="button" className="group relative flex w-full cursor-zoom-in items-center justify-center">
                        <img
                            alt="post"
                            className="max-h-140 w-auto max-w-full object-contain"
                            src={postImage}
                        />
                        <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10"></span>
                    </button>
                </div>
            )}

            {/* Stats and timestamp */}
            <div className="flex flex-col gap-2 border-t border-slate-200 px-4 py-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                    <span className="inline-flex items-center gap-2 font-semibold">{likes} likes</span>
                    <span className="inline-flex items-center gap-2 font-semibold">{shares} shares</span>
                    <span className="inline-flex items-center gap-2 font-semibold">{comments} comments</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">{timestamp}</span>
            </div>
        </article>
    );
}