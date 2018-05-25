import styled from 'styled-components';

const LoaderWrapper = styled.section`
  width: 100%;
  height: calc(100% - 79px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
LoaderWrapper.inner = styled.div`
  text-align: center;
`;
export default LoaderWrapper;
