import { FormState, FormActionTypes, UPDATE_FORM, RESET_FORM } from '../Schema';

const initialState: FormState = {
  email: '',
};

const formReducer = (state = initialState, action: FormActionTypes): FormState => {
  switch (action.type) {
    case UPDATE_FORM:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

export default formReducer;