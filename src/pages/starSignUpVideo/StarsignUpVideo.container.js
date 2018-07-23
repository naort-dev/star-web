import { connect } from 'react-redux';
import { startRecording, stopRecording, playVideo, reRecord, clearStreams } from '../../store/shared/actions/videoRecorder'
import { saveVideo } from '../../store/shared/actions/videoUploader'

import StarsignUpVideo from './StarsignUpVideo.component';

const mapStateToProps = state => ({
    isLoggedIn: state.session.isLoggedIn,
    videoRecorder: state.videoRecorder,
    session: state.session,
    videoUploader: state.videoUploader
});

const mapDispatchToProps = dispatch => ({
    onStartRecording: () => dispatch(startRecording()),
    onStopRecording: (recordedVideo) => dispatch(stopRecording(recordedVideo)),
    onPlayVideo: () => dispatch(playVideo()),
    onRerecord: () => dispatch(reRecord()),
    onClearStreams: () => dispatch(clearStreams()),
    onSaveVideo: (videoFile) => dispatch(saveVideo(videoFile))
});

export default connect(mapStateToProps, mapDispatchToProps)(StarsignUpVideo);