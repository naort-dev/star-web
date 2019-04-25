import { fetchCelebDetails } from './getCelebDetails';
import { fetchCelebVideosList } from './getCelebVideos';
import { fetchCelebGroups } from './getCelebGroups';

const fetchStarDetails = id => (dispatch) => {
    dispatch(fetchCelebDetails(id));
    dispatch(fetchCelebVideosList(0, true, id));
    dispatch(fetchCelebGroups(id, 0, true));
};

export default fetchStarDetails;