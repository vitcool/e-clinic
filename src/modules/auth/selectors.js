export const getIsUserLogined = state => state.auth.isUserlogined;

export const getCurrentUser = state => state.auth.currentUser;

export const getIsLoginRequestPending = state => state.auth.isLoginRequestPending;

export const getIsSignupRequestPending = state => state.auth.isSignupRequestPending;

export const getIsForgotPasswordRequestPending = state => state.auth.isForgotPasswordRequestPending;