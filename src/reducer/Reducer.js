const initState = {
    ConnectState: false,
    Login: 'login_vide',
    Password: 'password_vide'
}

const rootReducer = (state = initState, action) => {

    if(action.type === "USER_CONNECTED"){
        return {
            ConnectState: true,
            Login: action.Login, 
            Password: action.Password
        }
    }

    if(action.type === "USER_DISCONNECTED"){
        return {
            ConnectState: false
        }
    }
    return state;
}

export default rootReducer;