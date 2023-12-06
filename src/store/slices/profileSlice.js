import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { closeEditProfileModal } from "./authSlice";
import { refreshToken } from "./registerSlice";


export const getProfile = createAsyncThunk(
    'getProfile',
    async (id, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios(`http://127.0.0.1:8000/api/v1/profiles/profile/${id}`, 
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
                }
            })
            if (response.status === 200) {
                const data = await response.data
                console.log(data);
                dispatch(getusersInfo(data))
            }else {
                throw Error (`error: ${response.status}`)
               }
        } catch(error) {
            if (error.response && error.response.status === 401) {
                try {
                    dispatch(refreshToken())
                } catch (error) {
                    return rejectWithValue(error.response.data)
                }
            } else {
                return rejectWithValue(error.response.data)
            }
        }
    }
)
export const deleteProfileAction = createAsyncThunk(
    'deleteProfileAction',
    async (id, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/api/v1/profiles/profile/${id}/`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
                }
            })
            if(response.status === 204) {
                const data = await response.data
                console.log(data)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                window.location.assign('/')
            } else{
                throw Error (`error: ${response.status}`)
            }
        } catch(e) {
            console.log(e)
        }
    }
)
export const changeProfileAction = createAsyncThunk(
    'changeProfile',
    async(user, {dispatch, rejectWithValue}) => {
        try{
            const {id} = JSON.parse(localStorage.getItem('token'))
            const response = await axios(
                {
                    method: 'PATCH',
                    url: `http://127.0.0.1:8000/api/v1/profiles/change-password/${id}/`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
                    },
                    data: JSON.stringify(user)
                }
            )
            const data = await response.data
            console.log(data);
        } catch(e) {
            console.log(e)
        }
    }
)
export const editProfileAction = createAsyncThunk(
    'editProfileAction',
    async(param, {dispatch, rejectWithValue}) => {
        try{
            const {id} = JSON.parse(localStorage.getItem('token'))
            const response = await axios({
                method: 'PUT',
                url: `http://127.0.0.1:8000/api/v1/profiles/profile/${id}/`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
                },
                data: JSON.stringify(param)
            })
            const data = await response.data
            if(response.status === 201) {
                localStorage.setItem('newUser', JSON.stringify(data))
                JSON.parse(localStorage.getItem('newUser'))  
                dispatch(closeEditProfileModal())
            }
        } catch(e) {
            console.log(e)
        }
    }
)
const profileSlice = createSlice({
    name: 'profileSlice',
    initialState: {
        userInfo: {}
    },
    reducers: {
        getusersInfo: (state, action) => {
            state.userInfo = action.payload
        }
    }
})
export const {getusersInfo} = profileSlice.actions
export default profileSlice.reducer