import React from 'react'

export default function LoadingCard() {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-slate-200"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-slate-200"></div>
                    <div className="h-3 w-1/2 rounded bg-slate-200"></div>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="h-4 rounded bg-slate-200"></div>
                <div className="h-4 w-5/6 rounded bg-slate-200"></div>
            </div>
        </div>
    );
}