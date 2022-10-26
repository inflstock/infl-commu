import { ModalState } from "./reducer";

export const isOpen = (state: ModalState, name: string): boolean => {
  return state[name] && !!state[name].is_opened
}

export const getArgs = (state: ModalState, name: string): any => {
  return state[name] && !!state[name].args ? state[name].args : {}
}