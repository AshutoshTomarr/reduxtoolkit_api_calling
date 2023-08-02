import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//action create
export const createUser = createAsyncThunk("createUsers" , async(data,{rejectWithValue}) =>{
    const res = await fetch("https://64bd6fb22320b36433c7b49f.mockapi.io/crud",{
        method : "POST",
        headers :{
            "Content-Type":"application/json",
        },
        body : JSON.stringify(data),
    });

    try{
        const result = await res.json();
        return result;
    }catch(err){
        return rejectWithValue("Opps errorrr")
    }
})

// action read
export const showUser = createAsyncThunk("showUser",async(data,{rejectWithValue})=>{
    const res = await fetch("https://64bd6fb22320b36433c7b49f.mockapi.io/crud");
    try{
        const result = await res.json();
        return result;
    }catch(err){
        return rejectWithValue(err);
    }

})

//action delete user
export const deleteUser = createAsyncThunk("deleteUser",async(id,{rejectWithValue})=>{
    const res = await fetch(`https://64bd6fb22320b36433c7b49f.mockapi.io/crud/${id}` , {method:"DELETE"});
    try{
        const result = await res.json();
        return result;
    }catch(err){
        return rejectWithValue(err);
    }

})

//action create
export const updateUser = createAsyncThunk("updateUser" , async(data,{rejectWithValue}) =>{
    const res = await fetch(`https://64bd6fb22320b36433c7b49f.mockapi.io/crud/${data.id}`,{
        method : "PUT",
        headers :{
            "Content-Type":"application/json",
        },
        body : JSON.stringify(data),
    });

    try{
        const result = await res.json();
        return result;
    }catch(err){
        return rejectWithValue("Opps errorrr")
    }
})


export const userDetails = createSlice({
    name : "userDetails",
    initialState : {
        users : [],
        loading : false,
        error : null,
        searchData:[]
    },
    reducers:{
      searchUser: (state,action) => {
        state.searchData = action.payload; 
      },
    },
    extraReducers: (builder) => {
        builder
          .addCase(createUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(createUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
          })
          .addCase(createUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(showUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(showUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = (action.payload);
          })
          .addCase(showUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(deleteUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            const {id} = action.payload;
            if(id){
                state.users = state.users.filter((ele)=> ele.id !== id); 
            }
          })
          .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          .addCase(updateUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.map((ele) =>
            ele.id === action.payload.id ? action.payload : ele
          );
          })
          .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },
})
export default userDetails.reducer;
export const {searchUser} = userDetails.actions;