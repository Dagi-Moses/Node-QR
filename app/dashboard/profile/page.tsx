"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import dayjs from "dayjs";

export default function ProfilePage() {
    const { user } = useUser();
    const [firstName, setFirstName] = useState(user?.firstName ?? "moses");
    const [lastName, setLastName] = useState(user?.lastName ?? "dagi");

    const handleDeleteAccount = () => {
        if (confirm("Are you sure you want to delete your account? This cannot be undone.")) {
            // call Clerk delete account API
            user?.delete().then(() => {
                alert("Account deleted");
                // redirect or handle logout
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen space-y-8">
            <h1 className="text-3xl font-semibold">My Profile</h1>

            {/* BASIC INFO */}
            <section className="bg-white shadow rounded-md p-6 space-y-4">
                <h2 className="text-xl font-medium">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={user?.emailAddresses[0].emailAddress ?? ""}
                        readOnly
                        className="mt-1 block w-full border rounded-md px-3 py-2 bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Joined</label>
                    <p className="mt-1 text-gray-600">{user ? dayjs(user.createdAt).format("MMMM D, YYYY") : "-"}</p>
                </div>
            </section>

            {/* ACCOUNT SETTINGS */}
            <section className="bg-white shadow rounded-md p-6 space-y-4">
                <h2 className="text-xl font-medium">Account Settings</h2>

                {/* Change Email / Password (Clerk) */}
                <div className="space-y-2">
                    <p className="text-gray-700">Change your email or password:</p>
                    <button
                        onClick={() => alert("Open Clerk email/password update flow")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Update Email / Password
                    </button>
                </div>

                {/* Enable 2FA */}
                <div className="space-y-2">
                    <p className="text-gray-700">Two-Factor Authentication (2FA):</p>
                    <button
                        onClick={() => alert("Open Clerk 2FA setup")}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        Manage 2FA
                    </button>
                </div>

                {/* Delete Account */}
                <div className="space-y-2">
                    <p className="text-gray-700">Danger Zone:</p>
                    <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Delete Account
                    </button>
                </div>
            </section>
        </div>
    );
}
