import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../features/gitUserSlice';
import Navbar from './Navbar';

export default function Update() {

    const {id} = useParams();
    const {users,loading} = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updateData,setUpdateData] = useState({});

    useEffect(() => {
        if(id){
            const singleUser = users.filter((ele)=>ele.id === id); 
            setUpdateData(singleUser[0]);
        }
    }, []);
    console.log(updateData);
    
    const newData = (e)=>{
        setUpdateData({...updateData,[e.target.name] : [e.target.value]});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(updateUser(updateData));
        navigate('/read');
    }

    console.log(updateData);
    return (
        <div>
            <div><Navbar></Navbar></div>
            <h2 className="my-2">Edit the data</h2>
            <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={updateData && updateData.name}
                        className="form-control"
                        onChange={newData}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={updateData && updateData.email}
                        onChange={newData}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="text"
                        name="age"
                        className="form-control"
                        value={updateData && updateData.age}
                        onChange={newData}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        name="gender"
                        value="Male"
                        type="radio"
                        defaultChecked= {updateData && updateData.gender === "Male"}
                        onChange={newData}
                        required
                    />
                    <label className="form-check-label">Male</label>
                </div>
                <div className="mb-3">
                    <input
                        className="form-check-input"
                        name="gender"
                        value="Female"
                        type="radio"
                        defaultChecked= {updateData && updateData.gender === "Female"}
                        
                        onChange={newData}
                    />
                    <label className="form-check-label">Female</label>
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}
