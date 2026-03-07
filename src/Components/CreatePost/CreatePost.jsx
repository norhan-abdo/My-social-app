
import React, { useContext, useRef, useState } from "react";
import { FaRegLightbulb, FaImage, FaPaperPlane } from "react-icons/fa";
import profileImg from "../../assets/profile-img.png"; // عدّلي المسار لو مختلف
import { FiX } from "react-icons/fi";
import axios from "axios";
import { authContext } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function CreatePost() {

    const [imagePreview, setImagePreview] = useState(null);
    const { userToken } = useContext(authContext);
    const imageInput = useRef(null);
    const captionInput = useRef(null);

    const queryObj = useQueryClient();

    function handleClearImageInput() {

        captionInput.current.value = "";
        imageInput.current.value = "";
        setImagePreview(null);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const captionValue = captionInput.current.value.trim();
        const imageFile = imageInput.current.files[0];

        if (!captionValue && !imageFile) {
            alert("Post cannot be empty");
            return;
        }

        const dataObj = new FormData()

        if (captionInput.current.value) {

            dataObj.append("body", captionInput.current.value)
        }
        if (imageInput.current.files[0]) {

            dataObj.append("image", imageInput.current.files[0])
        }
        return axios.post('https://route-posts.routemisr.com/posts', dataObj, {

            headers: { token: userToken }
        })
    }

    const { isPending, mutate: createPostMutate } = useMutation({

        mutationFn: handleSubmit,
        onSuccess: () => {

            handleClearImageInput();

            queryObj.invalidateQueries({

                queryKey: ['getCommunityPosts'],
                exact: true
            })

            toast.success('Post created successfully.', {

                autoClose: 2000,
                closeOnClick: true,
            })

        },
        onError: () => {
            toast.error('Error ocurred try again.', {

                autoClose: 2000,
                closeOnClick: true,
            })

        }
    })

    return (
        <section className="bg-white shadow p-5 rounded-2xl space-y-4">
            {/* Header */}
            <header className="flex items-center gap-3">
                <div className="avatar rounded-full overflow-hidden border border-gray-400/20">
                    <img
                        src={profileImg}
                        alt="User avatar"
                        className="w-12 h-12"
                    />
                </div>
                <div>
                    <h2 className="font-semibold">Create a Post</h2>
                    <p className="text-gray-400 text-sm -mt-1">
                        Share your thoughts with the world
                    </p>
                </div>
            </header>

            {/* Form */}
            <form onSubmit={createPostMutate} className="space-y-4">
                {/* Textarea */}
                <div className="relative">
                    <textarea
                        ref={captionInput}
                        placeholder="What's on your mind?"
                        className="min-h-24 pl-11 w-full border border-gray-300 rounded-lg p-3 resize-none"
                    ></textarea>

                    <FaRegLightbulb className="text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>



                {imagePreview && (
                    <div className="relative mt-2">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-60 w-full rounded-lg object-cover"
                        />

                        <button
                            type="button"
                            onClick={handleClearImageInput}
                            className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white backdrop-blur-sm cursor-pointer"
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                )}


                {/* Bottom Section */}
                <div className="flex justify-between items-center border-t border-gray-400/20 pt-4">
                    {/* Upload Photo */}
                    <label
                        htmlFor="image"
                        className="flex items-center gap-1 cursor-pointer"
                    >
                        <div className="flex gap-1 items-center border px-4 py-2 rounded-lg border-gray-300/50">
                            <FaImage />
                            <span>Photo</span>
                        </div>

                        <input
                            ref={imageInput}
                            id="image"
                            type="file"
                            className="hidden"
                            onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))}
                        />
                    </label>

                    {/* Submit Button */}
                    <button
                        disabled={isPending}
                        type="submit"
                        className=" disabled:opacity-50 disabled:cursor-not-allowed  bg-linear-to-br from-blue-500 to-cyan-400 text-white flex gap-1 items-center px-4 py-2 rounded-lg"
                    >


                        {isPending ? (
                            <>
                                <span>Posting...</span>
                                <FaPaperPlane />
                            </>
                        ) : (
                            <>
                                <span>Post</span>
                                <FaPaperPlane />
                            </>
                        )}

                    </button>
                </div>
            </form>
        </section>
    );
}