import { UPDATE_FORM, RESET_FORM, FormActionTypes, FormState } from '../Schema';

export const updateForm = (formData: Partial<FormState>): FormActionTypes => ({
  type: UPDATE_FORM,
  payload: formData,
});

export const resetForm = (): FormActionTypes => ({
  type: RESET_FORM,
});