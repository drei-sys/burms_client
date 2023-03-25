import { create } from "zustand";

export const useUserStore = create(set => ({
    id: null,
    name: "",
    type: 0,
    setUser: user => set(state => ({ ...state, ...user }))
}));
