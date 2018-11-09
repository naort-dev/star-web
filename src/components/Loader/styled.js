import styled from 'styled-components';

const LoaderWrapper = styled.section`
  width: 100%;
  min-height: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
LoaderWrapper.inner = styled.div`
  text-align: center;
`;
export default LoaderWrapper;
