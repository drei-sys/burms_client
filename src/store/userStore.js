import { create } from "zustand";

export const useUserStore = create(set => ({
    id: null,
    name: "",
    type: "",
    status: "For Verification",
    setUser: user => set(state => ({ ...state, ...user }))
}));
