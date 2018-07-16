import React from 'react';
import VideoRecorderDiv from './styled';
let recordedBlobs = [];

export default class VideoRecorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mediaRecorder: null, error: null };
        this.mediaSource = new MediaSource();
    }

    componentDidMount() {
        this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen.bind(this), false);
        this.captureUserMedia({ audio: true, video: { width: { min: 640 }, height: { min: 480 } } });
    }

    handleSourceOpen() {
        sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp9"');
    }

    handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    }

    captureUserMedia(mediaConstraints) {
        return navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then(this.successCallback)
            .catch((err) => {
                this.setState({ error: true });

            })
    }

    successCallback(stream) {
        const liveVideo = document.getElementById('video-player')
        window.stream = stream;
        liveVideo.srcObject = window.stream;
    }

    stopRecording() {
        const superBuffer = new Blob(recordedBlobs, { type: 'video/mp4' });
        const videoSrc = window.URL.createObjectURL(superBuffer)
        this.props.onStopRecording(videoSrc)
        this.state.mediaRecorder.stop();
        this.closeStream()

    }

    closeStream() {
        let stream = document.getElementById('video-player').srcObject
        let tracks = stream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        document.getElementById('video-player').srcObject = null;
    }

    async startRecording(rerecord = false) {
        if (rerecord === true) {
            this.props.onRerecord();
            recordedBlobs = [];
            await this.captureUserMedia({ audio: true, video: { width: { exact: 640 }, height: { min: 480 } } })
        }
        let mediaRecorder
        this.props.onStartRecording()
        var options = { mimeType: 'video/webm;codecs=vp9' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: 'video/webm;codecs=vp8' };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options = { mimeType: 'video/webm' };
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    options = { mimeType: '' };
                }
            }
        }
        try {
            mediaRecorder = new MediaRecorder(window.stream, options);
            this.setState({ mediaRecorder: mediaRecorder })
            mediaRecorder.ondataavailable = this.handleDataAvailable;
            mediaRecorder.start(1000);
        } catch (e) {
            alert('Exception while creating MediaRecorder: '
                + e + '. mimeType: ' + options.mimeType);
            return;
        }
    }

    render() {
        return (
            <VideoRecorderDiv >
                {!this.props.videoRecorder.recordedBlob ?
                    <VideoRecorderDiv.Video id="video-player" autoPlay controls={this.props.videoRecorder.start ? true : false} />
                    :
                    <VideoRecorderDiv.Video id="video-player" src={this.props.videoRecorder.recordedBlob} controls />
                }
                {this.state.error ?
                    <h4> Unable to Record Video. Kindly refresh your browser </h4> :
                    this.props.videoRecorder.start == null ?
                        <VideoRecorderDiv.Button onClick={this.startRecording.bind(this)}> Record </VideoRecorderDiv.Button>
                        : (this.props.videoRecorder.start == true ?
                            <VideoRecorderDiv.Button onClick={this.stopRecording.bind(this)}> Stop Recording </VideoRecorderDiv.Button> :
                            <VideoRecorderDiv.Button onClick={this.startRecording.bind(this, true)}> Re-Record </VideoRecorderDiv.Button>)
                }
            </VideoRecorderDiv>


        )
    }
}
