const initState = {
    ConnectState: false,
    Login: 'login_vide',
    Password: 'password_vide',
    Faction: 'faction_vide',
    Role: 'role_vide',
    Banned: false,
}

const rootReducer = (state = initState, action) => {

    if(action.type === "USER_CONNECTED"){
        return {
            ConnectState: true,
            Login: action.Login, 
            Password: action.Password,
            Faction: action.Faction,
            Role: action.Role,
            Banned: action.Banned
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