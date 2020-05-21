import {
  UPDATE_APP_STATE,
  UPDATE_APP_TYPE,
  UPDATE_APP_CURRENT_USER,
} from 'actions/types';
import {AppState, AppType} from 'constants/app';

const initialState = {
  state: AppState.GUEST,
  type: AppType.LOADING,
  user: {
    email: null,
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_APP_STATE:
      return {
        ...state,
        state: action.appState,
      };
    case UPDATE_APP_TYPE:
      return {
        ...state,
        type: action.appType,
      };
    case UPDATE_APP_CURRENT_USER:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.user.email,
        },
      };
    default:
      return state;
  }
}
