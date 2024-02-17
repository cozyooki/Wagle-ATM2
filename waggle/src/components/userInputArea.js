import React, { useState, useEffect } from 'react';

const UserInputArea = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Submitted:', inputValue);
    setInputValue('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        justifyContent: 'center',
        width: '70%',
        backgroundColor: '#282c34',
        textAlign: 'center',
        padding: '10px 0',
        borderStyle: 'solid',
        borderWidth: '3px',
        borderColor: '#dedede',
        borderRadius: '10px',
      }}
    >
      <textarea
        style={{
          width: '90%',
          resize: 'none',
          outline: 'none',
          borderStyle: 'none',
          backgroundColor: '#282c34',
          color: 'white',
          textAlign: 'center',
        }}
        placeholder="Write a message to Mr.chat."
        value={inputValue}
        onChange={handleChange}
      ></textarea>

      <button
        style={{
          padding: '8px 16px',
          backgroundColor: '#46e086',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={handleSubmit}
      >
        ⬆️Send To Mr.Chat
      </button>
    </div>
  );
};

export default UserInputArea;
