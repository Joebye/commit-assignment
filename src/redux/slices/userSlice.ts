import User from "../../model/User";
import {createSlice} from '@reduxjs/toolkit';
const USER_ITEM = 'user_item';

function getUser(): User | undefined {
    const userJson = localStorage.getItem(USER_ITEM || '');
   let res: User | undefined;
    if(userJson) {
         res = JSON.parse(userJson);
    }
    return res;

}


const initialState: {user: User} = {
    user: getUser()!
    // username: '',
    // phonenumber: '',
    // password: ''
    
}
    const userSlice = createSlice({
        initialState,
        name: 'userState',
        reducers: {
            set: (state, data) => {
                localStorage.setItem(USER_ITEM, JSON.stringify(data.payload))
                state.user = data.payload;
            },
            reset: (state) => {
                state.user = undefined!;
                localStorage.removeItem(USER_ITEM)
            }
        }
    });
    export const userActions = userSlice.actions;
    export const userReducer = userSlice.reducer;


