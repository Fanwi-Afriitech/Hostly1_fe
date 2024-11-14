import './login.css';
import React ,{useState,useEffect}from 'react';
import axios from 'axios'
import Loader from '../components/Loader';
import Errors from '../components/Errors';

const Loginscreen = () => {
     
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
 
const handleLogin = async () => {
    const user = {
        
        email,
        password,
      };
        try {
            setloading(true)
            const response = await axios.post('http://localhost:5000/api/users/login', user);
            setloading(false)

            localStorage.setItem('currentUser', JSON.stringify(response.data))
            window.location.href='/home'
           
        } catch (error) {
            console.error('Registration error:', error);
            setloading(false)
            seterror(true)
        }
    }

  return (
    <div className='login-screen'>
       {loading && (<Loader/>)}
       
      <div className='row justify-content-center align-items-center vh-100'>
        <div className='col-md-6 col-lg-4'>
        {error && (<Errors message={'Invalid credentials'}/>)} 
          <div className='login-form bg-white p-4 rounded shadow'>
            <h1 className='text-center mb-4'>Login</h1>
          
            <input type='email' className='form-control mb-3' placeholder='Email'
            value={email}  onChange={(e) => setEmail(e.target.value)}
             />
            <input type='password' className='form-control mb-3' placeholder='Password' value={password}
              onChange={(e) => setPassword(e.target.value)}/>
           
            <button className='btn btn-primary w-100'  onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginscreen;
