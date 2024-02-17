import styled from '@emotion/styled'

const ModalBlackOutBox = ({
  onSetIsLoginVisible,
  onSetSingupVisible,
  onSetIsFilterVisible,
  type,
  }) => {
  const authType = {
    login: onSetIsLoginVisible,
    signup: onSetSingupVisible,
    filter: onSetIsFilterVisible,
  };
  return <ModalBlackOutBox onClick={authType[type]} />;
  };
const ModalBlackOut = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.65);
`;
export default ModalBlackOut;