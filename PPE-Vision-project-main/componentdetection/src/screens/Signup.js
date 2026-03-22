import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function Signup() {
    const navigate = useNavigate(); // add this

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.location
            })
        })
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid credentials");
        }
        else {
            alert("Account created successfully");
              navigate("/login");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
        <Navbar />
        <div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlfor="name" className="form-label">User Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={credentials.location}
                            onChange={onChange}
                        />
                    </div>

                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <label htmlfor="inputPassword6" className="col-form-label">Password</label>
                        </div>
                        <div className="col-auto">
                            <input type="password" id="inputPassword6" className="form-control" name='password' value={credentials.password} onChange={onChange} aria-describedby="passwordHelpInline" />
                        </div>
                        <div className="col-auto">
                            <span id="passwordHelpInline" className="form-text">
                                Must be minimum 5 characters long.
                            </span>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/login" className="btn btn-primary">Already have an account</Link>
                </form>
            </div>
        </div>
        </>
    )
}
