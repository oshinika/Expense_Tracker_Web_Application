/*import React,{useState, useEffect} from 'react';
import {Form,Input,message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import './register.css';


const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const submitHandler =  async (values) => {
       try{
        setLoading(true);
        await axios.post('/users/register', values);
        message.success("Registration successfull");
        setLoading(false);
        navigate('/login');
       } catch (error){
        setLoading(false)
        message.error('Invalid username or password')
       }
    };

    useEffect (() => {
        if(localStorage.getItem('user')){
          navigate('/')
        }
    },[navigate]);
  return (
    <>
    <div className = "register-page">
    {loading && <Spinner />}
    <Form layout="vertical" onFinish={submitHandler}>
    <h1>Register Form</h1>
    <Form.Item label="Name" name="name">
            <Input />
    </Form.Item>  

    <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>


          <Form.Item label="Password" name="password">
            <Input type="password" />
          </Form.Item>    

           <div className="d-flex justify-content-between">
            <Link to="/login">Already Register? Click Here to Login</Link>
            <button className="btn btn-primary">Register</button>
          </div>  
    </Form>
    </div>
    </>
  )
}

export default Register;

*/


import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';



const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post('/users/register', values);
      message.success("Registration successful");
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      message.error('Invalid username or password');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>


      <div className = "register-page"
      >
        {loading && <Spinner />}
        <Form
          layout="vertical"
          onFinish={submitHandler}
          style={{
            width: '25vw',
            padding: '40px',
            background: 'rgba(255, 255, 255, 0.2',
            borderRadius: '40px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 100)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '40px' }}>Register Form</h1>
          <Form.Item
            label="Name"
            name="name"
            style={{ color: 'black', fontSize: '30px' }}
          >
            <Input style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'black' }} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            style={{ color: 'black', fontSize: '30px' }}
          >
            <Input type="email" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'black' }} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            style={{ color: 'black', fontSize: '30px' }}
          >
            <Input type="password" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'black' }} />
          </Form.Item>

          <div className="d-flex justify-content-center">
            <Link to="/login" style={{ color: 'white', textDecoration: 'underline',fontSize: '18px'}}>Already Registered? Click Here to Login</Link>
            </div><div>
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: 'black',
                borderColor: 'rgba(255, 255, 255, 0.544)',
                color: 'white',
                borderRadius: '20px',
                padding: '10px 20px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                width: '150px',
                marginTop: '20px',
                fontSize: '20px',
                marginLeft : '80px',
                
              }}

              
            >
              Register
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
