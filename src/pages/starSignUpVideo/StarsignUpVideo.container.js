import { connect } from 'react-redux';
import { startRecording, stopRecording, playVideo, reRecord } from '../../store/shared/actions/videoRecorder'

import StarsignUpVideo from './StarsignUpVideo.component';

const mapStateToProps = state => ({
    isLoggedIn: state.session.isLoggedIn,
    videoRecorder: state.videoRecorder
});

const mapDispatchToProps = dispatch => ({
    onStartRecording: () => dispatch(startRecording()),
    onStopRecording: (recordedVideo) => dispatch(stopRecording(recordedVideo)),
    onPlayVideo: () => dispatch(playVideo()),
    onRerecord: () => dispatch(reRecord())
});


export default connect(mapStateToProps, mapDispatchToProps)(StarsignUpVideo);