export abstract class DatabaseReading {
    abstract fetchCampaign(id: string): Promise<string>
    abstract saveCampaign(id: string, pdfURL: string, htmlURL: string): void
}