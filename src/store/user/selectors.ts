import { UserState } from "./reducer";

export const getStorage = () => ((window && window.localStorage) || { setItem: () => {}, getItem: () => {}, removeItem: () => {} });

export const getUser = (state: UserState): UserState => state; 

export const isPrepared = (state: UserState): boolean => state._prepare;