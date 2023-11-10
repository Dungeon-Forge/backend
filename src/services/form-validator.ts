import { CampaignFormResponse } from "../models/campaign-form-response";

export class CampaignFormValidator {
    private minCharacters = 1
    private maxCharacters = 10
    private minScale = -1
    private maxScale = 1
    
    validateForm(form: CampaignFormResponse) {
        this.validateNumberCharacters(form.numPlayerCharacters)
        this.validateLevels(form.startingLevel, form.endingLevel)
        this.validatePreferenceScale(form.rolePlayingScale)
        this.validatePreferenceScale(form.puzzleScale)
        this.validatePreferenceScale(form.trapScale)
        this.validatePreferenceScale(form.combatScale)
    }

    private validateNumberCharacters(numCharacters: number) {
        const isValid = this.between(numCharacters,this.minCharacters, this.maxCharacters)
        if (!isValid) {
            throw new Error("Invalid numPlayerCharacters value");
        }
    }

    private validateLevels(start: number, end: number) {
        if (start <= 0) {
            throw new Error("Invalid startLevel value");
        }

        if (end <= 0) {
            throw new Error("Invalid endLevel value");
        }

        if (start >= end) {
            throw new Error("Campaign levels are invalid");
        }
    }

    private validatePreferenceScale(scale: number) {
        const isValid = this.between(scale, this.minScale, this.maxScale)
        if (!isValid) {
            throw new Error("Invalid preferenceScale value");
        }
    }

    private  between(x: number, min: number, max: number) {
        return x >= min && x <= max;
    }
}