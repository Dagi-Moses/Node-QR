import { create } from "zustand";

export type Subscription = {
  isSubscribed: boolean;
  plan: "free" | "week" | "month" | "year";
  // expiresAt?: string;
  expiresAt: Date | null;
};

type SubscriptionState = {
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;

  fetchSubscription: (token: string | null) => Promise<void>;
  clearSubscription: () => void;
};

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscription: null,
  loading: false,
  error: null,

  fetchSubscription: async (token: string | null) => {
    console.log("fetching subscription");
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscription`;
    // Prevent refetching if already loaded
    if (get().subscription) return;

    set({ loading: true, error: null });

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch subscription");
      }

      const data = await res.json();
      console.log("Data", data);
      set({
        subscription: data,
        loading: false,
      });
    } catch (err: any) {
      console.log("error", err);
      set({
        error: err.message,
        loading: false,
      });
    }
  },

  clearSubscription: () =>
    set({
      subscription: null,
      error: null,
      loading: false,
    }),
}));
