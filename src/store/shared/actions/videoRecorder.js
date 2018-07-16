export const START_VIDEO_RECORDING = 'startRecording'
export const STOP_VIDEO_RECORDING = 'stopRecording'
export const PLAY_RECORDED_VIDEO = 'playVideo'
export const RE_RECORD_VIDEO = 'reRecordVideo'


export function startRecording() {
    return {
        type: START_VIDEO_RECORDING
    }

}

export function stopRecording(recordedVideo) {
    return {
        type: STOP_VIDEO_RECORDING,
        payload: recordedVideo
    }

}

export function playVideo(recordedVideo) {
    return {
        type: PLAY_RECORDED_VIDEO,
        payload: recordedVideo
    }

}

export function reRecord() {
    return {
        type: RE_RECORD_VIDEO
    }

}
