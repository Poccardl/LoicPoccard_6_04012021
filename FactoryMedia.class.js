import Picture from "./Picture.class.js"
import Video from "./Video.class.js"

export default class FactoryMedia {
    constructor(media) {
        let MediaObjList = []
        for (let element in media) {
            if (media[element]["image"]) {
                let blabla = new Picture(media[element])
                MediaObjList.push(blabla)
            }
            else if (media[element]["video"]) {
                let blibli = new Video(media[element])
                MediaObjList.push(blibli)
            }
        }
        return MediaObjList
    }
}