import { fetchCelebDetails, resetCelebDetails } from './getCelebDetails';
import { fetchCelebVideosList } from './getCelebVideos';
import { fetchCelebGroups, resetCelebGroups } from './getCelebGroups';

const fetchStarDetails = id => (dispatch) => {
    dispatch(fetchCelebDetails(id));
    dispatch(fetchCelebVideosList(0, true, id));
    dispatch(fetchCelebGroups(id, 0, true));
};

const resetStarDetails = () => (dispatch) => {
    dispatch(resetCelebDetails());
    dispathc(resetCelebGroups());
}

export { fetchStarDetails, resetStarDetails };
