import styled from 'styled-components';
import { media } from '../../styles/mediaQueries';

export const Ul = styled.ul`
  padding-top: 10px;
`;

export const Li = styled.li`
  max-width: 300px;
  width: 100%;
  padding: 21px 40px;
  border: 1px solid #2f839d;
  border-radius: 30px;
  font-family: Gilroy-Bold;
  font-size: 18px;
  color: #2f839d;

  .brand {
    :after {
      background-image: ${(props) =>url('../../assets/images/card-icons/' + props.brandIcon)} no-repeat;
    }
  }
`;
