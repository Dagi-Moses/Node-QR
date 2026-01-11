"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";


type ApiResponse = {
    message: string,
    error: string
}

async function createProfileRequest() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { getToken } = useAuth();
    const token = await getToken();
    console.log("[CreateProfile] mutationFn START");


    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-profile`;
    console.log("[CreateProfile] fetch URL:", url);

    const response = await fetch(

        url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
    console.log("[CreateProfile] response status:", response.status);

    const data = await response.json();
    console.log("[CreateProfile] response body:", data);

    return data as ApiResponse;
}


export default function CreateProfile() {
    const { getToken } = useAuth();
    const { isLoaded, isSignedIn } = useUser();
    const router = useRouter();
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-profile`;

    console.log("[CreateProfile] useUser snapshot", {
        isLoaded,
        isSignedIn,

    });

    const { mutate, isPending } = useMutation<ApiResponse, Error>(

        {
            mutationFn: async () => {


                const token = await getToken();
                console.log("[CreateProfile] mutationFn START");



                console.log("[CreateProfile] fetch URL:", url);

                const response = await fetch(

                    url,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    });
                console.log("[CreateProfile] response status:", response.status);

                const data = await response.json();
                console.log("[CreateProfile] response body:", data);

                if (!response.ok) throw new Error(data.error || "Unknown error");

                return data as ApiResponse;
            }
            ,
            onSuccess: (data) => {
                console.log(data.message);
                toast.success("Profile synchronized successfully.");
                router.push("/subscribe");
            },
            onError: (error) => {
                console.error("Error creating profile:", error);
                toast.error(`Error: ${error.message}`);
                alert( `Error: ${error.message}`);
            },
        }
    );

    useEffect(() => {
        console.log("[CreateProfile] useEffect fired", {
            isLoaded,
            isSignedIn,
            isPending,
        });
        if (isLoaded && isSignedIn && !isPending) {
            mutate()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, isSignedIn])
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <Spinner />
        </div>
    );
}

