export const SAVE_IMAGE = 'viewImage'

export function saveImage(imageData) {
    return {
        type: SAVE_IMAGE,
        payload: imageData
    }

}




