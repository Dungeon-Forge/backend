export class CampaignJSONCleaner {
    cleanOpenAIJSON(input: string): string {
        var newString = input.replace(/,[\s]*\}/g, "}")
        newString = newString.replace(/,[\s]*\]/g, "]")
        newString = newString.replace(/\}\"$/g, "}")
        newString = newString.replace(/\n\n/g, '\n')
        return newString
    }
}