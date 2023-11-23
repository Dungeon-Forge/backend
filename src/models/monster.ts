import { stat } from "fs";

export class Monster {
    name: string;
    imageURL?: string;
    statBlockURL?: string;
    challengeRating: number;

    constructor(name: string, imageURL: string | undefined = undefined, statBlockURL: string | undefined = undefined, challengeRating: number = 0) {
        this.name = name
        this.imageURL = imageURL
        this.statBlockURL = statBlockURL
        this.challengeRating = challengeRating
    }
}