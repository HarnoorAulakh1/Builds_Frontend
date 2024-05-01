import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        _id: '',
        isAuthenticated: false,
        username: '',
        email: '',
        password: '',
        first: '',
        last: '',
        phno: '',
        photo: '',
        bio: '',
    },
    reducers: {
        setprofile: (state, action) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.password = action.payload.password;
            state.first = action.payload.first;
            state.last = action.payload.last;
            state.phno = action.payload.phno;
            state.photo = action.payload.photo;
            state.isAuthenticated = action.payload.isAuthenticated; 
            state.bio = action.payload.bio;
        },
        setbio: (state, action) => {
            state.bio = action.payload;
        },
        setisAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setFirstName: (state, action) => {
            state.first = action.payload;
        },
        setLastName: (state, action) => {
            state.last = action.payload;
        },
        setPhno: (state, action) => {
            state.phno = action.payload;
        },
    },
});

export const {setisAuthenticated, setUsername, setPassword, setFirstName, setLastName, setPhno ,setprofile,setbio} = profileSlice.actions;
export default profileSlice.reducer;