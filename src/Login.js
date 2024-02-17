import React from "react";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Flex, Button, Modal } from 'antd';

function Login() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const handleInputId = (e) => {
    setInputId(e.target.value)
  }
  const handleInputPw = (e) => {
    setInputPw(e.target.value)
  }
  const onClickLogin = () => {
    console.log('click login')
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return(
    <Flex gap="small" wrap="wrap">
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Flex>
  )
}

export default Login;