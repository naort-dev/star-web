import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const TextFieldStyled = styled(TextField)`
  .error-field {
    &:after {
      border-bottom-color: #980100 !important;
    }
  }
`;

export default TextFieldStyled;