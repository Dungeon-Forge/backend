export class CampaignSetting {
    _id: any | undefined
    name: string
    map: string | undefined
    html: string

    constructor(_id: any | undefined = undefined, name: string, html: string, map: string | undefined) {
        this._id = _id,
        this.name = name
        this.html = html
        this.map = map
    }
}