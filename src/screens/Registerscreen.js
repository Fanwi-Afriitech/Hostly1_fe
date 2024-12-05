import './login.css';
import React, { useState} from 'react';
import axios from 'axios'
import Loader from '../components/Loader';
import Errors from '../components/Errors';
import Sucess from '../components/Sucess';
const Registerscreen = () => {
  // UseState hooks to manage form input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const[sucess,setsucess]= useState()

  const handleRegister = async () => {
    if (password === confirmPassword) {
      const user = {
        name,
        email,
        password,
      };
    try {
      setloading(true)
      const response = await axios.post('https://hostly-be.onrender.com/api/users/register', user);
      console.log(response.data);
      setloading(false)
      setsucess(true)

      setEmail('')
      setName('')
      setConfirmPassword('')
      setPassword('')
   
    } catch (error) {
      console.error('Registration error:', error);
      setloading(false)
      seterror(true)
    }
  } else {
    alert('Passwords do not match');
}
  };
return (
  <div className='register-screen'>
    {loading && (<Loader/>)}
    {error && (<Errors/>)}
    

    <div className='row justify-content-center align-items-center vh-100'>
      <div className='col-md-6 col-lg-4'>
      {sucess && (<Sucess message={'registration sucessful'}/>)}
        <div className='register-form bg-white p-4 rounded shadow'>
          <h1 className='text-center mb-4'>Register</h1>
          <input type='text' className='form-control mb-3' placeholder='Name'
            value={name} onChange={(e) => setName(e.target.value)} />
          <input type='email' className='form-control mb-3' placeholder='Email'
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input type='password' className='form-control mb-3' placeholder='Password' value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <input type='password' className='form-control mb-4' placeholder='Confirm Password' value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
          <button className='btn btn-primary w-100' onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  </div>
);
};

export default Registerscreen;
