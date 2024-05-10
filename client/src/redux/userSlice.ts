import { createSlice } from "@reduxjs/toolkit";
import {User} from '../constants/interfaces'

interface UserState {
    currentUser: User | null,
    error: string,
    loading: boolean
}

const initialState: UserState = {
    currentUser: null,
    error: '',
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
            state.error = ''
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = ''
        },
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        logOutSuccess: (state) => {
            state.currentUser = null
            state.error = ''
            state.loading = false
        }
    }
})

export const {signInStart, signInSuccess, signInFailure, logOutSuccess} = userSlice.actions

export default userSlice.reducer