export interface CampaignSetting {
    name: string;
    territory: string;
    politics: string;
    history: string;
}

export interface AdventureHook {
    title: string;
    locationDescription: string;
    keyLocations: KeyLocation[];
    keyFigures: KeyFigure[];
    eventDescription: string;
}

export interface KeyLocation {
    name: string;
    description: string;
}

export interface KeyFigure {
    name: string;
    description: string;
}

export interface TravelAdventureArc {
    chapterTitle: string,
    travelJustification: string,
    destinationName: string,
    destinationOverview: string,
    destinationDetails: string,
    modesOfTransport: ModesOfTransport[]
    destinationKeyLocations: KeyLocation[]
}

export interface ModesOfTransport {
    name: string,
    cost: number,
    description: string,
    potentialHazards: Hazard[]
}

export interface Hazard {
    name: string,
    probability: number,
    description: string,
    consequence: string
}

export interface SideQuestArc {
    chapterTitle: string,
    chapterIntroduction: string,
    sidequests: SideQuest[],
    chapterConclusion: string
}

export interface SideQuest {
    questTitle: string,
    questGiverBackground: string,
    sideQuestBackground: string,
    sideQuestRequest: string,
    proposedReward: string
}

export interface DungeonArc {
    chapterTitle: string,
    chapterIntroduction: string,
    chambers: Chamber[],
    rewards: string
}

export interface Chamber {
    chamberName: string,
    chamberDescription: string,
    chamberEvent: string
}

export interface FinalResolution {
    chapterTitle: string,
    resolution: string
}