import styled from 'styled-components';

const MultiLevelStyled = styled.ul`
  padding: 10px;
`;

MultiLevelStyled.ParentItem = styled.li`
  
`;

MultiLevelStyled.MainItem = styled.span`
  padding: 5px;
  cursor: pointer;
  display: block;
  &:hover {
    background-color: #FF6C58;
  }
`;

MultiLevelStyled.InnerListWrapper = styled.ul`

`;

MultiLevelStyled.InnerListItem = styled.li`
  padding: 5px;
  padding-left: 15px;
  cursor: pointer;
`;

export default MultiLevelStyled;
