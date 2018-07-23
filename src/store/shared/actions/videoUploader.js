export const SAVE_VIDEO = 'saveRecording'

export function saveVideo(videoData) {
    return {
        type: SAVE_VIDEO,
        payload: videoData
    }

}




