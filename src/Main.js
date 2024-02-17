import React, { useState, useEffect } from 'react';
import { Layout, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import Sidebar from './components/Sidebar';
import UserInputArea from './components/userInputArea';
import Home from './/Home.js';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const url = 'http://54.85.191.171/chat';

const Main = () => {
  const [data, setData] = useState([]);
  const [lastChat, setLastChat] = useState(-1);
  /* 서버로 채팅 전송, 서버 응답 UI 반영 */
  const appendData = (userChat) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descript: userChat }),
    })
      // API 연동 성공
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((response) => {
        if (response.success) {
          const newLastChat = response.lastChat;
          // 새로운 채팅 목록 및 마지막 채팅 ID 업데이트
          const newChatList = response.answer
            ? [{ descript: response.answer, speaker: 0 }, ...data]
            : data; // 새로운 채팅 목록 및 마지막 채팅 ID 업데이트
          setData((prevData) => [...prevData, ...newChatList]);
          setLastChat(newLastChat);
        } else {
          console.log(response.error || 'Unknown error occured');
        }
      })
      // API 연동 실패
      .catch((error) => {
        console.log('Fetching data error:', error);
      });
  };

  useEffect(() => {
    appendData('');
  }, []);

  const handleUserChat = (userInput) => {
    console.log('main --> handleUserChat');
    appendData(userInput);
  };

  return (
    <>
      <Layout style={{ height: '100%', minHeight: '100vh' }}>
        <Sider>
          {/* 사이드바 컴포넌트 */}
          <Sidebar />
        </Sider>

        <Layout style={{ backgroundColor: '#282c34', color: 'white' }}>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}>
            <div>
              <List>
                <VirtualList data={data} itemHeight={54} itemKey={(item, index) => index}>
                  {(item) => (
                    <List.Item style={{ color: 'white' }}>
                      {/* 0이면 GPT이고 왼쪽 정렬, 1이면 사용자 채팅이고 오른쪽 정렬 */}
                      <div style={{ textAlign: item.speaker === 0 ? 'left' : 'right' }}>
                        {item.descript}
                      </div>
                    </List.Item>
                  )}
                </VirtualList>
              </List>
              {/* 유저 입력 창 컴포넌트 */}
              <UserInputArea onUserChat={handleUserChat} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Main;