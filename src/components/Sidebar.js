import React, { useState, useEffect } from 'react';
import { MessageOutlined } from '@ant-design/icons';
import { Menu } from 'antd';


const { Item } = Menu;

const Sidebar = () => {
  const [focusedItem, setFocusedItem] = useState(null);
  

  const handleFocus = (key) => {
    setFocusedItem(key);
  };

  return (
    <div>
      <div
        style={{
          height: '3rem',
          color: 'white',
          textAlign: 'center',
          lineHeight: '3rem',
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        지난 대화 목록
      </div>

      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Item
          key="1"
          icon={<MessageOutlined />}
          style={{ backgroundColor: focusedItem === '1' ? '#46e086' : 'inherit' }}
          onFocus={() => handleFocus('1')}
          onBlur={() => handleFocus(null)}
          tabIndex="0"
        >
          대화 1
        </Item>
        <Item
          key="2"
          icon={<MessageOutlined />}
          style={{ backgroundColor: focusedItem === '2' ? '#46e086' : 'inherit' }}
          onFocus={() => handleFocus('2')}
          onBlur={() => handleFocus(null)}
          tabIndex="0"
        >
          대화 2
        </Item>
      </Menu>
    </div>
  );
};

export default Sidebar;