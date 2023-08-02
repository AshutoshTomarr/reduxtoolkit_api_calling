import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showUser } from '../features/gitUserSlice';
import CustomModal from './CustomModal';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function Read() {

    const dispatch = useDispatch();
    const { users, loading, searchData} = useSelector((state) => state.app);
    const [id, setId] = useState();
    const [radioData,setRadioData] = useState("");

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        dispatch(showUser());
    }, [dispatch]);

    if (loading) {
        return (<h2>Loading...</h2>)
    }

    return (
        <div>
            <div><Navbar></Navbar></div>
            {showPopup && <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />}
            <h2>ALL DATA</h2>

            <input
                className="form-check-input"
                name="gender"
                
                checked ={radioData === ""}
                type="radio"
               onChange={(e) => setRadioData("")}
            />
            <label className="form-check-label">All</label> 
            <input
                className="form-check-input"
                name="gender"
                checked={radioData === "Male"}
                value="Male"
                type="radio"
                onChange={(e) => setRadioData(e.target.value)}
            />
            <label className="form-check-label">Male</label>
            <input
                className="form-check-input"
                name="gender"
                value="Female"
                checked={radioData === "Female"}
                type="radio"
                onChange={(e) => setRadioData(e.target.value)}
            />
            <label className="form-check-label">Female</label>


            {users &&
               users
               .filter((ele) => {
                 if (searchData.length === 0) {
                   return ele;
                 } else {
                   return ele.name.toString().toLowerCase().includes(searchData.toString().toLowerCase());
                 }
               })
               .filter((ele)=>{
                if(radioData === "") return ele;
                else return ele.gender.includes(radioData);
               })
             .map((ele) => (
                <div key={ele.id} className="card w-50 mx-auto my-2">
                    <div className="card-body">
                        <h5 className="card-title">{ele.name}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
                        <p className="card-text">{ele.gender}</p>
                        <button href="/" className="card-link" onClick={() => [setId(ele.id), setShowPopup(true)]}>View</button>
                        <Link to={`/edit/${ele.id}`} className="card-link">Edit</Link>
                        <Link onClick={() => dispatch(deleteUser(ele.id))} className="card-link">Delete</Link>
                    </div>
                </div>))}
        </div>
    )
}
