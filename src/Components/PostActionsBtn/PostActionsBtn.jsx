
import { React, useState, useRef, useEffect } from "react";
import { LuEllipsis } from "react-icons/lu";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

export default function PostActionsBtn({ onDelete, onUpdate, btnType, isPending, showUpdate = true }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    // يقفل لو ضغطتي برا
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>

            <button
                onClick={() => {
                    setOpen(!open);
                }}
                disabled={isPending}

                className="cursor-pointer rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            >
                {isPending ? (
                    <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <LuEllipsis size={16} />
                )}            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

                    {/* Update */}


                    {showUpdate && (
                        <button
                            onClick={() => {
                                setOpen(false);
                                onUpdate && onUpdate();
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            <FiEdit2 size={16} />
                            <span>Update {btnType}</span>
                        </button>
                    )}

                    {/* Delete */}
                    <button
                        onClick={() => {
                            console.log("Delete Post");
                            setOpen(false);
                            onDelete();

                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                        <FiTrash2 size={16} />
                        <span>Delete {btnType}</span>
                    </button>

                </div>
            )}
        </div>
    );
}