import { AdventureType, OpenAICampaignGenerator } from "./open-ai-campaign-generator"

test('Determine Next Adventure cannot be the same as the previous', () => {
    const generator = new OpenAICampaignGenerator()
    
    for (var i = 0; i < 100; i++) {
        expect(generator.determineAdventureType(AdventureType.TRAVEL)).not.toBe(AdventureType.TRAVEL)
    }
})