import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
    account: {
        access_token: '',
        // refresh_token: '',
        user: {
            id: '',
            name: '',
            email: ''
        }
    },
    isAuthenticated: false
}

const userReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log("Check action: ", action.payload.data.access_token)
            return {
                ...state, account: {
                    access_token: action.payload.data.access_token,
                    // refresh_token: '',
                    user: {
                        id: action?.payload?.data?.user?.id,
                        name: action?.payload?.data?.user?.name,
                        email: action?.payload?.data?.user?.email
                    }
                },
                isAuthenticated: true
            };
        default:
            return state;
    }

}
export default userReducer;