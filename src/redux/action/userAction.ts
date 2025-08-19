// khai báo theo kiểu hằng số và export để dùng nhiều nơi
// có thể dổi tên thành tên bất kỳ

// export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_SHOPZY';
export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";
export const doLogin = (data: any) => {
    return {
        type: FETCH_USER_LOGIN_SUCCESS, // type
        payload: data
    }
}

export const doLogout = () => {
    return {
        type: USER_LOGOUT_SUCCESS
    }
} 