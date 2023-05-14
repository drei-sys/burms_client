import { create } from "zustand";

export const useAppStore = create(set => ({
    isSidebarDrawerVisible: false,
    setSidebarDrawerVisible: isVisible =>
        set(state => ({ ...state, isSidebarDrawerVisible: isVisible }))
}));
