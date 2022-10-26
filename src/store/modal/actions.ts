export const MODAL_SHOW = 'MODAL_SHOW' as const;
export const MODAL_HIDE = 'MODAL_HIDE' as const;

export const modalShow = (name: string, args: any = {}, callback?: Function) => ({
  type: MODAL_SHOW,
  payload: { name, args, callback },
  meta: { gtm: name }
})

export const modalHide = (name: string, args: any = {}, callback?: Function) => ({
  type: MODAL_HIDE,
  payload: { name, args, callback },
})

export type ModalActions = 
  | ReturnType<typeof modalShow>
  | ReturnType<typeof modalHide>