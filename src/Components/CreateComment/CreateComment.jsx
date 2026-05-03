import React, { useState, useRef, useEffect, useContext } from "react";
import { FaImage, FaSmile, FaPaperPlane } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { authContext } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function CreateComment({ userName, userPhoto, postId, queryKey }) {
    const [comment, setComment] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);
    const { userToken } = useContext(authContext);
    function handleEmojiClick(emojiData) {
        setComment((prev) => prev + emojiData.emoji);
    }



    function handleAddComment() {

        const formData = new FormData();
        formData.append("content", comment);

        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        return axios.post(
            `https://route-posts.routemisr.com/posts/${postId}/comments`,
            formData,
            {
                headers: {
                    token: userToken
                },
            },

        );
    }

    const queryClientObj = useQueryClient();

    const { data, mutate: addCommentMutate, isPending } = useMutation({

        mutationFn: handleAddComment,
        onSuccess: () => {

            console.log("Send:", comment);
            setComment("");
            setSelectedImage(null);
            queryClientObj.invalidateQueries({

                queryKey: queryKey,
            })

            queryClientObj.invalidateQueries({ queryKey: ['getCommunityPosts'] });

        }
    })

    // يقفل لما نضغط بره
    useEffect(() => {
        function handleClickOutside(e) {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowPicker(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative flex items-start gap-2">
            <img
                alt={userName}
                className="h-9 w-9 rounded-full object-cover"
                src={userPhoto}
                onError={(e) => {
                    e.currentTarget.src =
                        "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png";
                }}
            />

            <div className="w-full rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white">
                <textarea
                    placeholder={`Comment as ${userName}...`}
                    rows="1"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="max-h-35 min-h-10 w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-slate-500"
                />

                <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-1">

                        {/* Upload */}
                        <label className=" inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600">
                            <FaImage size={16} />
                            <input
                                accept="image/*"
                                className="hidden"
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setSelectedImage(e.target.files[0]);
                                    }
                                }}
                            />                        </label>

                        {/* Emoji */}
                        <button
                            type="button"
                            onClick={() => setShowPicker((prev) => !prev)}
                            className="cursor-pointer inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-amber-500"
                        >
                            <FaSmile size={16} />
                        </button>
                    </div>

                    {/* Send */}
                    <button
                        className="cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff]"
                        disabled={!comment.trim() || isPending}
                        onClick={addCommentMutate}>

                        {isPending ? (<span className="loader h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>)
                            : <FaPaperPlane size={14} />}
                    </button>
                </div>
            </div>

            {/* Emoji Picker */}
            {showPicker && (
                <div
                    ref={pickerRef}
                    className="absolute bottom-16 left-12 z-50 shadow-lg"
                >
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        width={280}
                        height={350}
                    />
                </div>
            )}
        </div>
    );
}