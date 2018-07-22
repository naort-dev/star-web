import React from 'react';
import VideoRecorderDiv from './styled';
import Loader from '../Loader'
import getAWSCredentials from '../../utils/AWSUpload'
import axios from 'axios'
import { fetch } from '../../services/fetch'


export default class VideoRecorder extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mediaRecorder: null, error: null, startUpload: false, streamFetched: null, browserSupport: true, checkSupport: null };
        this.mediaSource = new MediaSource();
        this.mediaRecorder = null;
        this.recordedBlobs = []
        this.handleDataAvailable = this.handleDataAvailable.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
        this.timerID = null
        this.stream = null
    }

    componentDidMount() {
        if (window.navigator && window.navigator.mediaDevices.getUserMedia) {
            this.captureUserMedia({ audio: true, video: { width: { exact: 640 }, height: { min: 480 } } })
        }

        else {
            this.setState({ browserSupport: false });
        }
    }

    handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
            this.recordedBlobs.push(event.data);
        }
    }

    captureUserMedia(mediaConstraints) {
        this.setState({ checkSupport: true })
        return window.navigator.mediaDevices.getUserMedia(mediaConstraints)
            .then((stream) => this.successCallback(stream))
            .catch((err) => {
                this.setState({ browserSupport: false });

            })
    }

    successCallback(stream) {
        const liveVideo = document.getElementById('video-player')
        liveVideo.srcObject = stream;
        this.stream = stream;
        this.setState({ checkSupport: false })
    }

    stopRecording() {
        if (this.timerID != null) {
            clearTimeout(this.timerID)
        }
        const superBuffer = new Blob(this.recordedBlobs, { type: 'video/mp4' });
        const videoSrc = window.URL.createObjectURL(superBuffer)
        this.props.onStopRecording({ videoSrc, superBuffer })
        this.mediaRecorder.stop();
        this.closeStream()

    }

    closeStream() {
        const stream = document.getElementById('video-player').srcObject
        const tracks = stream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        document.getElementById('video-player').srcObject = null;
    }

    fileUpload() {
        const file = document.getElementById("default-uploader").files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            this.setState({ startUpload: true })
            getAWSCredentials("user/signed_url/?extension=mp4&key=authentication_videos&file_type=video", this.props.session.auth_token.authentication_token, file)
                .then(response => {
                    axios.post(response.url, response.formData)
                        .then(() => fetch.post('https://app.staging.starsona.com/api/v1/user/celebrity_profile/', {
                            ...this.props.location.state.bioDetails, profile_video: response.filename, availability: true
                        },
                            {
                                "headers": {
                                    'Authorization': `token ${this.props.session.auth_token.authentication_token}`
                                }
                            }
                        )
                        )
                })
                .then(() => {
                    this.setState({ startUpload: false })
                    this.props.history.push({ pathname: "/starsuccess", state: { images: this.props.location.state.images } })

                })
        }.bind(this), false);
        if (file) {
            reader.readAsDataURL(file)
        }
    }

    async startRecording(rerecord = false) {
        if (rerecord === true) {
            this.props.onRerecord();
            this.recordedBlobs = [];

        }
        this.props.onStartRecording()
        return this.captureUserMedia({ audio: true, video: { width: { exact: 640 }, height: { min: 480 } } })
            .then(() => {
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
                    this.mediaRecorder = new MediaRecorder(this.stream, options);
                    this.mediaRecorder.ondataavailable = this.handleDataAvailable
                    this.mediaRecorder.start(1000);
                    this.timerID = setTimeout(() => {
                        this.stopRecording()
                    }, 61000);
                } catch (e) {
                    alert('Error while creating MediaRecorder: '
                        + e + '. mimeType: ' + options.mimeType);
                    return;
                }
            })
            .catch(err => this.setState({ error: true }))

    }

    render() {
        return (
            <React.Fragment>
                {this.state.browserSupport == true ?
                    <VideoRecorderDiv >
                        <VideoRecorderDiv.VideoContainer>
                            {!this.props.videoRecorder.recordedBlob ?
                                <VideoRecorderDiv.Video id="video-player" autoPlay muted="muted" />
                                :
                                <VideoRecorderDiv.Video id="video-player" src={this.props.videoRecorder.recordedBlob} controls width="100%" />
                            }
                        </VideoRecorderDiv.VideoContainer>
                        {this.state.error ?
                            <h4> Unable to Record Video. Kindly refresh your browser </h4> :
                            this.props.videoRecorder.start == null ?
                                <VideoRecorderDiv.Button onClick={this.startRecording.bind(this)}> Record </VideoRecorderDiv.Button>
                                : (this.props.videoRecorder.start == true ?
                                    <VideoRecorderDiv.Button onClick={this.stopRecording}> Stop Recording </VideoRecorderDiv.Button> :
                                    <VideoRecorderDiv.Button onClick={this.startRecording.bind(this, true)}> Re Record </VideoRecorderDiv.Button>)
                        }
                    </VideoRecorderDiv>

                    :

                    <VideoRecorderDiv>

                        <VideoRecorderDiv.NoVideoContainer>
                            {this.state.startUpload ?
                                <VideoRecorderDiv.LoaderWrapper>
                                    <Loader />
                                </VideoRecorderDiv.LoaderWrapper>
                                : null
                            }
                            <VideoRecorderDiv.NoVideoText>
                                Your Browser does not support video recording
                            </VideoRecorderDiv.NoVideoText>
                            <VideoRecorderDiv.UploadWrapper>
                                <VideoRecorderDiv.NoVideoButton> upload video </VideoRecorderDiv.NoVideoButton>
                                <VideoRecorderDiv.UploadInput id="default-uploader" accept=".mp4" onChange={() => { this.fileUpload() }} type="file" />
                            </VideoRecorderDiv.UploadWrapper>
                        </VideoRecorderDiv.NoVideoContainer>

                    </VideoRecorderDiv>
                }

            </React.Fragment>


        )
    }
}



