import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Flex, Button, Modal } from 'antd';

function Home() {
  const movePage = useNavigate();
  function goMain() {
    movePage('/main')
  }
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const showModal1 = () => {
    setIsModal1Open(true);
  };
  const showModal2 = () => {
    setIsModal2Open(true);
  };
  const handleOk = () => {
    setIsModal1Open(false);
    setIsModal2Open(false);
  };
  const handleCancel = () => {
    setIsModal1Open(false);
    setIsModal2Open(false);
  };

  const [loginId, setloginId] = useState('');
  const [loginPw, setloginPw] = useState('');
  const [signupId, setsignupId] = useState('');
  const [signupPw, setsignupPw] = useState('');
  const [error, setError] = useState(null);
  const [nowLogin, setNowLogin] = useState(false);
  const handleLoginId = (e) => {
    setloginId(e.target.value)
  }
  const handleLoginPw = (e) => {
    setloginPw(e.target.value)
  }
  const handleSignupId = (e) => {
    setsignupId(e.target.value)
  }
  const handleSignupPw = (e) => {
    setsignupPw(e.target.value)
  }
  async function loginHandler() {
    setError(null)
    try {
      const response = await fetch(
        'http://54.85.191.171/login',
        {
        method: 'POST',
        body: JSON.stringify({id:loginId, pw:loginPw}),
        headers:{
          'Content-Type':'application/json',
        }
      });
      const data = await response.json();
      console.log(response.ok)
      if (response.ok) {
        console.log(data.text())
        setNowLogin(true)
        movePage('/home')
      } 
      else if (response.ok === false) {
        throw new Error('에러 발생 !!');
      }
    } catch (error) {
      setError(error.message)
    }
  }
  async function signupHandler() {
    setError(null)
    try {
      const response = await fetch(
        'http://54.85.191.171/register',
        {
          method: 'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({id:signupId, pw:signupPw}),
        }
      );
      const data = await response.json();
      if (!data.ok) {
        throw new Error('에러 발생 !!');
      }
      else if (data.ok === true) {
        console.log(data.text())
        movePage('/home')
      }
    } catch (error) {
      setError(error.message)
    }
  };
  async function logoutHandler() {
    setError(null)
    try {
      const response = await fetch('http://54.85.191.171/logout', {
        method: 'POST',
        }
      );
      const data = await response.json();
      if (!data.ok) {
        throw new Error('에러 발생 !!');
      } 
      else {
        console.log(data.text())
        setNowLogin(false)
        movePage('/home')
      }
    } catch (error) {
      setError(error.message)
    }
  };
  function onClickLogin() {
    loginHandler();
  }
  function onClickSignUp() {
    signupHandler();
  }
  function onClickLogOut() {
    logoutHandler();
  }
  return (
    <div className="Home">
      <header className="Home-header">
        <h1 className='title'>와글와글 ATM</h1>
        <nav>
          <Flex gap="small" wrap="wrap">
            <Button className='btn1'>여기엔</Button>
            <Button className='btn2'>무슨</Button>
            <Button className='btn3'>내용이?</Button>
          <Button type="primary" className='login' onClick={showModal1}>Login</Button>
          <Button type='primary' className='signup' onClick={showModal2}>Sign Up</Button>
          {nowLogin && <Button type='primary' className='logout' onClick={onClickLogOut}>Logout</Button>}
          <Modal title="Login" open={isModal1Open} onOk={handleOk} onCancel={handleCancel}>
            <h2>Login</h2>
            <div>
              <label>Login ID : </label>
              <input type='text' id='login_id' value={loginId} onChange={handleLoginId} />
            </div>
            <div>
              <label>Login PW : </label>
              <input type='password' id='login_pw' value={loginPw} onChange={handleLoginPw} />
            </div>
            <div>
              <button type='button' onClick={onClickLogin}>Login</button>
            </div>
          </Modal>
          <Modal title="SignUp" open={isModal2Open} onOk={handleOk} onCancel={handleCancel}>
            <h2>SignUp</h2>
            <div>
              <label>SignUp ID : </label>
              <input type='text' id='signup_id' value={signupId} onChange={handleSignupId} />
            </div>
            <div>
              <label>SignUp PW : </label>
              <input type='password' id='signup_pw' value={signupPw} onChange={handleSignupPw} />
            </div>
            <div>
              <button type='button' onClick={onClickSignUp}>SignUp</button>
            </div>
          </Modal>
          </Flex>
        </nav>
      </header>
      <div className='Home-main'>
        <h2 className='mainmessage1'>당신도 영어로 말할 수 있다.</h2>
        <h2 className='mainmessage3'>You can do it Too_</h2>
        <h4 className='mainmessage2'>AI 영어 과외 선생님 Mr.Chat</h4>
        <img src="img/초록색6.jpeg" className='img1'/>
        <img src="img/_.jpeg" className='img2'/>
        <Button type='primary' className='start' onClick={goMain}>Mr.Chat 시작하기!</Button>
      </div>
    </div>
  );
}
export default Home;