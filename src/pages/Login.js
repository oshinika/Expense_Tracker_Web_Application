import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, message } from 'antd';
import video from '../pages/video.mp4'; // Ensure the path is correct
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import './login.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/users/login', values);
      setLoading(false);
      message.success('Login successful');
      localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
      navigate('/');
    } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const handleVideoEnd = () => {
      setShowLogin(true);
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  return (
    <>
      {!showLogin && (
        <>
          <div className="overlay"></div>
          <video ref={videoRef} src={video} muted autoPlay className="background-video"></video>
        </>
      )}
      {showLogin && (
        <div className="login-page" >
          {loading && <Spinner />}
          <div className="login-box">
            <Form layout="vertical" onFinish={submitHandler}>
              <h1>LOGIN</h1>
              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" />
              </Form.Item>
              <div className="d-flex justify-content-center">
                <Link to="/register" className="register-link" style={{ textDecoration: 'underline'}}>Not a User? Click Here to register</Link>
              </div>
              <div>
                <button className="btn btn-primary">LOGIN</button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;