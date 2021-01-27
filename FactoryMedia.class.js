import Picture from "./Picture.class.js"
import Video from "./Video.class.js"

export default class FactoryMedia {
    constructor(media) {
        let MediaObjList = []
        for (let element in media) {
            if (media[element]["image"]) {
                let picture_obj = new Picture(media[element])
                MediaObjList.push(picture_obj)
            }
            else if (media[element]["video"]) {
                let video_obj = new Video(media[element])
                MediaObjList.push(video_obj)
            }
        }
        return MediaObjList
    }
}