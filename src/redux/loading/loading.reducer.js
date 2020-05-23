import loadingActionTypes from './loading.types';

const initState = {
    isLoading: false,
};

export const loadingScreenReducer = (state = {initState}, action) => {
    if (action.type === loadingActionTypes.SET_LOADING) {
        return{
            isLoading: action.isLoading,
        };
    }
    return state;
};