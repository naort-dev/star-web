import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const TextFieldStyled = styled(TextField)`
    .input-underline {
        &:after {
            border-color: ${props => props.theme.flatBlue};
        }
        &:hover {
            &:before {
                border-bottom: 1px solid rgba(0, 0, 0, 0.42) !important;
            }
        }
    }
`;

export default TextFieldStyled;