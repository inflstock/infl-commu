import { ModalActions, MODAL_HIDE, MODAL_SHOW } from "./actions";

export type ModalState = {
  [name: string]: {
    is_opened: boolean;
    args: any;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: ModalState = {}, action: ModalActions): ModalState => {
  switch (action.type) {
    case MODAL_SHOW:
      return {
        ...state,
        [action.payload.name] : {
          is_opened: true,
          args: action.payload.args ? action.payload.args : {}
        }
      }
    case MODAL_HIDE:
      if (action.payload.name) {
        return {
          ...state,
          [action.payload.name] : {
            is_opened: false,
            args: action.payload.args ? action.payload.args : {}
          }
        }
      }
      return {}
    default: 
      return state;
  }
}
