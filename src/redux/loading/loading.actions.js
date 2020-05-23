import loadingActionTypes from './loading.types';

export const setLoadingTrue = () => {
    return (dispatch, getState) => {
        dispatch({type: loadingActionTypes.SET_LOADING, isLoading: true});
    }
};

export const setLoadingFalse = () => {
    return (dispatch, getState) => {
        dispatch({type: loadingActionTypes.SET_LOADING, isLoading: false});
    }
};