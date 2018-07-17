import React from 'react';
import VideoRecorderDiv from './styled';


export default class VideoRecorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mediaRecorder: null, error: null, streamFetched: null };
        this.mediaSource = new MediaSource();
        this.mediaRecorder = null;
        this.recordedBlobs = []
    }


    handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
            this.recordedBlobs.push(event.data);
        }
    }

    captureUserMedia(mediaConstraints) {
        return navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then(this.successCallback)
            .then(() => this.setState({ streamFetched: true }))
            .catch((err) => {
                console.log("err", err)
                this.setState({ error: true });

            })
    }

    successCallback(stream) {
        const liveVideo = document.getElementById('video-player')
        window.stream = stream;
        liveVideo.srcObject = window.stream;
    }

    stopRecording() {
        const superBuffer = new Blob(this.recordedBlobs, { type: 'video/mp4' });
        const videoSrc = window.URL.createObjectURL(superBuffer)
        this.props.onStopRecording({ videoSrc, superBuffer })
        this.mediaRecorder.stop();
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
            this.recordedBlobs = [];
            await this.captureUserMedia({ audio: true, video: { width: { exact: 640 }, height: { min: 480 } } })
        }
        this.props.onStartRecording()
        await this.captureUserMedia({ audio: true, video: { width: { exact: 640 }, height: { min: 480 } } })
        var options = { mimeType: 'video/mp4;codecs=vp9' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options = { mimeType: 'video/mp4;codecs=vp8' };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                options = { mimeType: 'video/mp4' };
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    options = { mimeType: '' };
                }
            }
        }
        try {
            this.mediaRecorder = new MediaRecorder(window.stream, options);
            this.mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this);
            this.mediaRecorder.start(1000);
        } catch (e) {
            alert('Exception while creating MediaRecorder: '
                + e + '. mimeType: ' + options.mimeType);
            return;
        }
    }

    render() {
        return (
            <VideoRecorderDiv >
                <VideoRecorderDiv.VideoContainer>
                    {!this.props.videoRecorder.recordedBlob ?
                        <VideoRecorderDiv.Video id="video-player" autoPlay />
                        :
                        <VideoRecorderDiv.Video id="video-player" src={this.props.videoRecorder.recordedBlob} controls width="100%" />
                    }
                </VideoRecorderDiv.VideoContainer>
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