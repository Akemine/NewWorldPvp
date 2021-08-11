import { createStore, combineReducers } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'app',
    storage,
  };

const initStateLogin = {
    ConnectState: false,
    Login: 'login_vide',
    Password: 'password_vide',
    Faction: 'faction_vide',
    Role: 'role_vide',
    Banned: false
}

const initStateServerChoose = {
    ServerChoosed: 'all'
}

const loginReducer = (state = initStateLogin, action) => {

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

const serverChoiceReducer = (state = initStateServerChoose, action) => {
    if(action.type === "CHANGE_SERVER_LEARDERBOARD"){
        return {
            ServerChoosed: action.ServerChoosed
        }
    }
    return state;
}

const rootReducer = combineReducers({loginReducer, serverChoiceReducer})
const persistedReducers = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducers);
export const persistor = persistStore(store);

export default store;