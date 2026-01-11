"use client";

import { useEffect } from "react";

import { ReactQueryClientProvider } from "../react-query-client-provider";
import { useSubscriptionStore } from "@/src/store/subscription.store";
import { useAuth } from "@clerk/nextjs";

export function AppProviders({ children }: { children: React.ReactNode }) {
   const { getToken } = useAuth();
    
  const fetchSubscription = useSubscriptionStore(
    (s) => s.fetchSubscription
  );

  useEffect(() => {
    const run = async () => {
      const token = await getToken();
      fetchSubscription(token);
    };

    run();
  }, [ getToken,fetchSubscription]);

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
