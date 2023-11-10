import { CampaignEvent } from "./campaign-event"

export class Adventure {
    title: string
    html: string
    events: CampaignEvent[]

    constructor(events: CampaignEvent[], title: string, html: string) {
        this.events = events
        this.title = title
        this.html = html
    }
}