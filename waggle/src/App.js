import React, { useState, useEffect } from 'react';
import { Layout, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import Sidebar from './components/Sidebar';
import UserInputArea from './components/userInputArea';

const { Sider, Content } = Layout;

/* API */
const url = 'http://54.85.191.171/chat';

const App = () => {
  // 상태 변수 설정
  const [data, setData] = useState([]);
  const [lastChat, setLastChat] = useState(-1);

  /* 채팅 전송 및 서버 응답 반영  함수*/
  const appendData = (userChat) => {
    // POST 요청 보냄
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descript: userChat }),
    })
      // API 연동 성공 케이스
      .then((res) => {
        // 네트워크 응답 오류
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
            : data;
          setData((prevData) => [...prevData, ...newChatList]);
          setLastChat(newLastChat);
        } else {
          console.log(response.error || 'Unknown error occured');
        }
      })
      // API 연동 실패 케이스
      .catch((error) => {
        console.log('Fetching data error:', error);
      });
  };

  const handleUserChat = (userInput) => {
    appendData(userInput);
  };

  /* 컴포넌트 마운트 시, 초기 데이터를 가져오는 함수 */
  useEffect(() => {
    appendData('');
  }, []);

  return (
    <Layout style={{ height: '100%', minHeight: '100vh' }}>
      <Sider>
        사이드바 컴포넌트
        <Sidebar />
      </Sider>

      <Layout style={{ backgroundColor: '#282c34', color: 'white' }}>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
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
  );
};

export default App;
