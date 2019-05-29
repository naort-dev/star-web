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
        input {
            &::-webkit-input-placeholder { color: #aaaaaa;opacity: 1 }
            &:-moz-placeholder { color: #aaaaaa;opacity: 1 }
            &::-moz-placeholder { color: #aaaaaa;opacity: 1 }
            &:-ms-input-placeholder { color: #aaaaaa;opacity: 1 }
            &:placeholder { color: #aaaaaa;opacity: 1 }
            &::placeholder { color: #aaaaaa;opacity: 1 }
        }
    }
`;

export default TextFieldStyled;