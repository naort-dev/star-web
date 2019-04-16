import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Progress = styled(CircularProgress)`
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
`;