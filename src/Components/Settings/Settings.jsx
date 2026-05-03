
import React, { useContext } from "react";
import { FaKey } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { authContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// ======= Zod Schema =======
const passwordSchema = z
    .object({
        currentPassword: z.string().nonempty("Current password is required."),
        newPassword: z
            .string()
            .min(8, "At least 8 characters with uppercase, lowercase, number, and special character.")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                "At least 8 characters with uppercase, lowercase, number, and special character."
            ),
        confirmPassword: z.string().nonempty("Confirm password is required."),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export default function Settings() {
    const { userToken } = useContext(authContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(passwordSchema),
    });

    const mutation = useMutation({
        mutationFn: (data) =>
            axios.patch(
                "https://route-posts.routemisr.com/users/change-password",
                { password: data.currentPassword, newPassword: data.newPassword },
                { headers: { "Content-Type": "application/json", token: userToken } }
            ),
        onSuccess: () => {
            toast.success("Password changed successfully.", { autoClose: 2000 });
            reset();
        },
        onError: (err) => {
            toast.error("Error changing password.", { autoClose: 2000 });
            console.error(err);
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <div className="mx-auto max-w-2xl p-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f3ff] text-[#1877f2]">
                        <FaKey size={18} />
                    </span>
                    <div>
                        <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                            Change Password
                        </h1>
                        <p className="text-sm text-slate-500">
                            Keep your account secure by using a strong password.
                        </p>
                    </div>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Current Password */}
                    <label className="block">
                        <span className="mb-1.5 block text-sm font-bold text-slate-700">
                            Current password
                        </span>
                        <input
                            type="password"
                            placeholder="Enter current password"
                            className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                            {...register("currentPassword")}
                        />
                        {errors.currentPassword && (
                            <span className="mt-1 block text-xs font-semibold text-rose-600">
                                {errors.currentPassword.message}
                            </span>
                        )}
                    </label>

                    {/* New Password */}
                    <label className="block">
                        <span className="mb-1.5 block text-sm font-bold text-slate-700">
                            New password
                        </span>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                            {...register("newPassword")}
                        />
                        {errors.newPassword ? (
                            <span className="mt-1 block text-xs font-semibold text-rose-600">
                                {errors.newPassword.message}
                            </span>
                        ) : (
                            <span className="mt-1 block text-xs text-slate-500">
                                At least 8 characters with uppercase, lowercase, number, and special character.
                            </span>
                        )}
                    </label>

                    {/* Confirm Password */}
                    <label className="block">
                        <span className="mb-1.5 block text-sm font-bold text-slate-700">
                            Confirm new password
                        </span>
                        <input
                            type="password"
                            placeholder="Re-enter new password"
                            className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none transition border-slate-200 focus:border-[#1877f2] focus:bg-white"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <span className="mt-1 block text-xs font-semibold text-rose-600">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </label>

                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-[#1877f2] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {mutation.isLoading ? (
                            <span className="animate-spin">⏳ Changing...</span>
                        ) : (
                            "Update password"
                        )}
                    </button>
                </form>
            </section>
        </div>
    );
}