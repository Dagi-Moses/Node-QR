"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

type SubscriptionData = {
    planType: string;
    active: boolean;
    expiresAt: string | null;
    provider: string;
    reference: string;
};

type ProfileData = {
    id: string;
    userId: string;
    email: string;
    subscription?: SubscriptionData;
};

export default function Page() {
    const { isLoaded, isSignedIn } = useUser();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [email, setEmail] = useState("");
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`;
    const { getToken } = useAuth();


    // Fetch profile from backend
    useEffect(() => {
        if (!isLoaded || !isSignedIn) return;


        const fetchProfile = async () => {
            setLoading(true);
            try {
                const token = await getToken();
                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data: ProfileData = await res.json();
                setProfile(data);
                setEmail(data.email);
            } catch (err) {
                console.error("Fetch profile error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [isLoaded, isSignedIn]);

    // Save email update
    const handleSave = async () => {
        if (!profile) return;
        setSaving(true);
        try {
            const token = await getToken();
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error("Failed to update profile");
            const updated: ProfileData = await res.json();
            setProfile(updated);
        } catch (err) {
            console.error("Update profile error:", err);
        } finally {
            setSaving(false);
        }
    };

    if (!isLoaded) return <div className="p-10">Loading…</div>;
    if (!isSignedIn) return <div className="p-10">You must sign in to view this page.</div>;
    if (loading) return <div className="p-10">Fetching profile…</div>;
    if (!profile) return <div className="p-10">Profile data not found.</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
            <h1 className="text-2xl font-semibold">Profile</h1>

            <div className="space-y-4 rounded-lg border p-6">
                <div>
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="font-mono text-sm break-all">{profile.userId}</p>
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full rounded border px-3 py-2"
                    />
                </div>

                {profile.subscription && (
                    <div>
                        <p className="text-sm text-muted-foreground">Subscription</p>
                        <p>
                            Plan: {profile.subscription.planType} | Active:{" "}
                            {profile.subscription.active ? "Yes" : "No"} | Expires:{" "}
                            {profile.subscription.expiresAt
                                ? new Date(profile.subscription.expiresAt).toLocaleDateString()
                                : "—"}{" "}
                            | Provider: {profile.subscription.provider} | Reference:{" "}
                            {profile.subscription.reference}
                        </p>
                    </div>
                )}

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="mt-4 rounded bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
                >
                    {saving ? "Saving…" : "Save"}
                </button>
            </div>
        </div>
    );
}
