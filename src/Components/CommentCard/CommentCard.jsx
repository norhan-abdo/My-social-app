import React, { useContext, useState } from 'react'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { LuEllipsis } from "react-icons/lu";
import PostActionsBtn from '../PostActionsBtn/PostActionsBtn';
import { authContext } from '../../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

dayjs.extend(relativeTime);

export default function CommentCard({ comment, postCreatorId }) {
  if (!comment) return null;

  const {
    content,
    createdAt,
    likes,
    commentCreator,
    _id: commentId,
    post: postId,
  } = comment;
  console.log(comment)
  const {
    _id: commentCreatorId,
    name = "Unknown",
    username = "unknown",
    photo = "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png",
  } = commentCreator || {};

  const { userId, userToken } = useContext(authContext);
  const isOwner = commentCreatorId === userId;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [editedImage, setEditedImage] = useState(null);
  const queryClient = useQueryClient();
  function handleDeletComment() {

    return axios.delete(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`, {
      headers: { token: userToken },
    })
  }


  const { mutate: deleteCommentMutate, isPending } = useMutation({
    mutationFn: handleDeletComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postComments", postId] });
      queryClient.invalidateQueries({ queryKey: ['getCommunityPosts'] });
      toast.success('comment deleted successfully.', {

        autoClose: 2000,
        closeOnClick: true,
      })
    },
    onError: () => {

      toast.error('Error occurred .', {

        autoClose: 2000,
        closeOnClick: true,
      })
    }
  });


  const { mutate: updateComment, isPending: isUpdating } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("content", editedContent);

      if (editedImage) {
        formData.append("image", editedImage);
      }

      return axios.put(
        `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
        formData,
        {
          headers: {
            token: userToken,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Comment updated successfully");
      setIsEditing(false);
      queryClient.invalidateQueries(["postDetails"]);
    },
    onError: () => {
      toast.error("Failed to update comment");
    }
  });

  function handleUpdateComment() {
    updateComment();
  }

  return (
    <div className="relative flex items-start gap-2">
      {/* Avatar */}
      <img
        src={photo}
        alt={name}
        className="mt-0.5 h-8 w-8 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        {/* Bubble */}
        <div className="relative inline-block max-w-full rounded-2xl bg-[#f0f2f5] px-3 py-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-slate-900">
                {name}
              </p>
              <p className="text-xs text-slate-500">
                @{username} · {dayjs(createdAt).fromNow()}
              </p>
            </div>
          </div>


          {isEditing ? (
            <div className="mt-2 flex flex-col gap-2">
              <input
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="border rounded px-2 py-1"
              />

              <input
                type="file"
                onChange={(e) => setEditedImage(e.target.files[0])}
              />

              <div className="flex gap-2">
                <button
                  onClick={handleUpdateComment}
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
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
              {content}
            </p>
          )}





        </div>

        {/* Actions */}
        <div className="mt-1.5 flex items-center justify-between px-1">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-slate-400">
              {dayjs(createdAt).fromNow()}
            </span>

            <button className="text-xs font-semibold text-slate-500 hover:underline">
              {/*               Like ({likesCount})
 */}            </button>

            <button className="text-xs font-semibold text-slate-500 hover:text-[#1877f2] hover:underline transition">
              Reply
            </button>
          </div>

          {(commentCreatorId === userId || (userId === postCreatorId)) && (<PostActionsBtn onDelete={() => deleteCommentMutate()} onUpdate={() => setIsEditing(true)}
            btnType='' isPending={isPending || isUpdating} showUpdate={isOwner}
          />)}


          {/*
        
          <button className="rounded-full p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700">
            <LuEllipsis size={16} />
          </button>

        */}
        </div>
      </div>
    </div>
  );
}