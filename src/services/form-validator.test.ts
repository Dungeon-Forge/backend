import { CampaignFormResponse } from "../models/campaign-form-response";
import { CampaignFormValidator } from "./form-validator";
import {expect, jest, test} from '@jest/globals';

// Validate Number of Players
test('NumPlayerCharacters cannot be negative', () => {
    const validator = new CampaignFormValidator()
    const response = {
        "numPlayerCharacters": -1
    } as CampaignFormResponse

    expect(() => {
        validator.validateForm(response)
    }).toThrowError("Invalid numPlayerCharacters value")
});

test('NumPlayerCharacters cannot be zero', () => {
    const validator = new CampaignFormValidator()
    const response = {
        "numPlayerCharacters": 0
    } as CampaignFormResponse

    expect(() => {
        validator.validateForm(response)
    }).toThrowError("Invalid numPlayerCharacters value")
});

// Validate Levels
test('startLevel cannot be zero', () => {
    const validator = new CampaignFormValidator()
    const response = {
        "numPlayerCharacters": 1,
        "startingLevel": 0,
        "endingLevel": 0
    } as CampaignFormResponse

    expect(() => {
        validator.validateForm(response)
    }).toThrowError("Invalid startLevel value")
});

test('startLevel cannot be negative', () => {
    const validator = new CampaignFormValidator()
    const response = {
        "numPlayerCharacters": 1,
        "startingLevel": -1,
        "endingLevel": -1

    } as CampaignFormResponse

    expect(() => {
        validator.validateForm(response)
    }).toThrowError("Invalid startLevel value")
});

test('endLevel cannot be zero', () => {
    const validator = new CampaignFormValidator()
    const response = {
        "numPlayerCharacters": 1,
        "startingLevel": 1,
        "endingLevel": 0
    } as CampaignFormResponse

    expect(() => {
        validator.validateForm(response)
    }).toThrowError("Invalid endLevel value")
});

test('endLevel cannot be negative', () => {
    const validator = new CampaignFormValidator()
    const response = {
        "numPlayerCharacters": 1,
        "startingLevel": 1,
        "endingLevel": -1
    } as CampaignFormResponse

    expect(() => {
        validator.validateForm(response)
    }).toThrowError("Invalid endLevel value")
});

test('startLevel cannot be greater than endLevel', () => {
    const validator = new CampaignFormValidator()
    const response = {
        "numPlayerCharacters": 1,
        "startingLevel": 5,
        "endingLevel": 1
    } as CampaignFormResponse

    expect(() => {
        validator.validateForm(response)
    }).toThrowError("Campaign levels are invalid")
});

test('startLevel cannot be the same as endLevel', () => {
    const validator = new CampaignFormValidator()
    const response = {
        "numPlayerCharacters": 1,
        "startingLevel": 1,
        "endingLevel": 1
    } as CampaignFormResponse

    expect(() => {
        validator.validateForm(response)
    }).toThrowError("Campaign levels are invalid")
});

// Validate Preferences
test('Roleplaying preference must be between -1 and 1', () => {
    const validator = new CampaignFormValidator()

    const negativeResponse = {
        "numPlayerCharacters": 1,
        "startingLevel": 1,
        "endingLevel": 2,
        "rolePlayingScale": -2
    } as CampaignFormResponse

    expect(() => {
        validator.validateForm(negativeResponse)
    }).toThrowError("Invalid preferenceScale value")
    
    const positiveResponse = {
        "numPlayerCharacters": 1,
        "startingLevel": 1,
        "endingLevel": 2,
        "rolePlayingScale": 2
    } as CampaignFormResponse

    expect(() => {
        validator.validateForm(positiveResponse)
    }).toThrowError("Invalid preferenceScale value")
})

// Valid Input
test('Validator Accepts Valid Input', () => {
    const validator = new CampaignFormValidator()
    const response = {
        numPlayerCharacters: 1,
        startingLevel: 1,
        endingLevel: 5,
        rolePlayingScale: 0,
        trapScale: 0,
        puzzleScale: 0,
        combatScale: 0
    }

    expect(() => {
        validator.validateForm(response)
    }).not.toThrow()
})
