import React ,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Login() {

  const [credentials, setCredentials] = useState({email: "", password: ""});
 let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/loginuser', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: credentials.email,
    password: credentials.password
  })
});

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    else {
      alert("Welcome to PPE Vision");
    }
    if (json.success) {
      localStorage.setItem("authToken", "your-token"); // or json.token if using real JWT
    alert("Welcome to PPE Vision");
    navigate("/");
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
      <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
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
          <Link to="/signup" className="btn btn-primary">I am new user</Link>
        </form>
        
      </div>
    </div>
    
      </>
  )

}