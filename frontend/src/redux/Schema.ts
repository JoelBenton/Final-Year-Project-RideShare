export interface FormState {
    email: string;
  }
  
  export const UPDATE_FORM = 'UPDATE_FORM';
  export const RESET_FORM = 'RESET_FORM';
  
  export interface UpdateFormAction {
    type: typeof UPDATE_FORM;
    payload: Partial<FormState>;
  }
  
  export interface ResetFormAction {
    type: typeof RESET_FORM;
  }
  
  export type FormActionTypes = UpdateFormAction | ResetFormAction;