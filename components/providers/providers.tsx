"use client";

import { useEffect } from "react";

import { ReactQueryClientProvider } from "../react-query-client-provider";
import { useSubscriptionStore } from "@/src/store/subscription.store";
import { useAuth } from "@clerk/nextjs";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
    
  const fetchSubscription = useSubscriptionStore(
    (s) => s.fetchSubscription
  );

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    const run = async () => {
      const token = await getToken();
      fetchSubscription(token);
    };

    run();
  }, [isLoaded, isSignedIn, getToken,fetchSubscription]);

  return (
      <ReactQueryClientProvider >
    {children}
  </ReactQueryClientProvider >
)
  ;
}



// app/providers.tsx
// "use client";

// import { ClerkProvider } from "@clerk/nextjs";
// import { ReactQueryClientProvider } from "@/components/react-query-client-provider";

// export function Providers({ children }: { children: React.ReactNode }) {
//     return (
    
         
//                 {children}
//             </ReactQueryClientProvider>
//         </ClerkProvider>
//     );
// }
