
import React from "react";
import { Users, Search, UserPlus } from "lucide-react";

const suggestedFriendsData = [
    {
        id: 1,
        name: "Ahmed Bahnasy",
        username: "@bahnasy20222",
        img: "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771018057253-2285ec56-8e3c-4ea3-9ee4-c235037ffffe-Screenshot-2026-02-13-at-11.27.15---PM.png",
        followers: 138,
        mutual: 1,
    },
    {
        id: 2,
        name: "Ahmed Abd Al-Muti",
        username: "@ahmedmutti",
        img: "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771038591307-b70f2a83-d052-400d-a8ea-5c601b51e262-WhatsApp-Image-2026-01-21-at-05.00.10.jpeg",
        followers: 79,
        mutual: 1,
    },
    {
        id: 3,
        name: "Ahmed Abd Al-Muti",
        username: "@ahmedmut3ti",
        img: "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771071361223-3cf47f81-53bb-47d2-baae-783be7cc51e1-IMG-20251121-WA0041.webp",
        followers: 31,
        mutual: 1,
    },
    {
        id: 4,
        name: "mohamed",
        username: "route user",
        img: "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
        followers: 25,
        mutual: 0,
    },
    {
        id: 5,
        name: "Zeinab",
        username: "@zeinab",
        img: "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1771069205269-2b08eb7a-0425-40be-9805-d34ef66c3cd2-IMG_9522.webp",
        followers: 20,
        mutual: 0,
    },
];

export default function RightSidebar() {
    return (
        <aside className="hidden h-fit xl:sticky xl:top-21 xl:block">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                {/* Header */}
                <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Users size={18} className="text-[#1877f2]" />
                        <h3 className="text-base font-extrabold text-slate-900">
                            Suggested Friends
                        </h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                        {suggestedFriendsData.length}
                    </span>
                </div>

                {/* Search */}
                <div className="mb-3">
                    <label className="relative block">
                        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            placeholder="Search friends..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
                        />
                    </label>
                </div>

                {/* Friends List */}
                <div className="space-y-3">
                    {suggestedFriendsData.map(friend => (
                        <div key={friend.id} className="rounded-xl border border-slate-200 p-2.5">
                            <div className="flex items-center justify-between gap-2">
                                <button
                                    type="button"
                                    className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                                >
                                    <img
                                        alt={friend.name}
                                        src={friend.img}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                                            {friend.name}
                                        </p>
                                        <p className="truncate text-xs text-slate-500">{friend.username}</p>
                                    </div>
                                </button>
                                <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
                                    <UserPlus size={13} />
                                    Follow
                                </button>
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                                <span className="rounded-full bg-slate-100 px-2 py-0.5">{friend.followers} followers</span>
                                {friend.mutual > 0 && (
                                    <span className="rounded-full bg-[#edf4ff] px-2 py-0.5 text-[#1877f2]">{friend.mutual} mutual</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
                    View more
                </button>
            </div>
        </aside>
    );
}