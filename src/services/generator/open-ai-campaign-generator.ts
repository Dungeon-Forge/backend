import { json } from "body-parser";
import { response } from "express";
import OpenAI from "openai";
import { CampaignFormResponse } from "../../models/campaign-form-response";
import { AdventureHook, CampaignSetting, DungeonArc, FinalResolution, Hazard, SideQuestArc, TravelAdventureArc } from "./generator-interfaces";
import { LoggerRepository } from "../logger/LoggerRepository";
import { ConsoleLogger } from "../logger/ConsoleLogger";
import { FileLogger } from "../logger/FileLogger";

const logger = new LoggerRepository([new ConsoleLogger(), new FileLogger()])

export class OpenAICampaignGenerator {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORG_ID
    });
    previousAdventureType: AdventureType = AdventureType.SIDEQUEST

    async generateCampaign(form: CampaignFormResponse): Promise<string> {
        this.previousAdventureType = AdventureType.SIDEQUEST
        return new Promise(async (resolve, reject) => {
            try {
                var responseHTML = ``
                const setting = await this.generateCampaignSetting()

                responseHTML += setting
                const settingName = this.getSettingNameFromHTML(setting)
                const adventureHook = await this.generateAdventureHook(settingName)

                responseHTML += adventureHook

                const adventures = await this.generateAdventureArcs(form)
                responseHTML += adventures

                const resolution = await this.generateFinalResolution()
                responseHTML += resolution

                resolve(responseHTML)
            } catch(err) {
                logger.log("Failed to generate a campaign: " + err);
                reject(err);
            }
        })
    }

    private getSettingNameFromHTML(html: string): string {
        return html.split("\n")[0].slice(-5).substring(4)
    }

    private parseStringIntoParagraphs(input: string): string[] {
        return input.split("\n")
        .map(element => element.trim())
        .filter(element => element);
    }

    private async generateCampaignSetting(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                logger.log("Sending campaign setting generation request to Open AI")
                const completion = await this.openai.chat.completions.create({
                    messages: [{ role: "user", content: `create a new campaign setting for a dungeons and dragons 5e setting. Describe the name, territory, political environment, and recent history leading up to the campaign. 
                    where the territory, politics, and history strings contain the full details in multiple paragraphs. 
                    ` }
                    ],
                    model: "gpt-3.5-turbo",
                    functions: [
                        {
                            name: "createCampaignSettingObject",
                            parameters: {
                                type: "object",
                                properties: {
                                    "name": {
                                        type: "string"
                                    }, 
                                    "territory": {
                                        type: "string"
                                    }, 
                                    "politics": {
                                        type: "string"
                                    }, 
                                    "history": {
                                        type: "string"
                                    } 
                                },
                                required: ["name", "territory", "politics", "history"]
                            }
                        }
                    ],
                    function_call: {
                        name: "createCampaignSettingObject"
                    }
                });
                
                const content = completion.choices[0].message.function_call
                
                if (content != null) {
                    var responseHTML = ""
                    logger.log("Received campaign setting response from OpenAI: " + content.arguments)

                    try {
                        const jsonResponse: CampaignSetting = JSON.parse(content.arguments)
                        responseHTML += `<h1>${jsonResponse.name}</h1>`
                        const territoryParagraphs = this.parseStringIntoParagraphs(jsonResponse.territory)

                        for(var i = 0; i < territoryParagraphs.length; i++) {
                            if (i == 0) {
                                responseHTML += `<p class="firstText">${territoryParagraphs[i]}</p>\n`
                            } else {
                                responseHTML += `<p>${territoryParagraphs[i]}</p>\n`
                            }
                        }

                        const politicsParagraphs = this.parseStringIntoParagraphs(jsonResponse.politics)
                        politicsParagraphs.forEach(value => {
                            responseHTML += `<p>${value}</p>\n`
                        })

                        const historyParagraphs = this.parseStringIntoParagraphs(jsonResponse.history)
                        historyParagraphs.forEach(value => {
                            responseHTML += `<p>${value}</p>\n`
                        })

                        resolve(responseHTML)
                    } catch (error) {
                        logger.log("failed to parse campaign setting: " + error + content.arguments)
                        reject(error);
                    }
                } else {
                    reject(new Error("Generated campaign setting response is null"))
                    return
                }
            } catch (error) {
                logger.log("Failed to create campaign setting due to error: " + error)
                reject(error)
            }
        })
    }

    private async generateAdventureHook(campaignSetting: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                logger.log("Sending adventure hook generation request to Open AI")
                const completion = await this.openai.chat.completions.create({
                    messages: [{ role: "user", content: `define an adventure hook for a group of adventures within the ${campaignSetting} setting. Describe the location in which the adventurers meet, and provide background on important figures met within the adventure hook. The adventure hook should also introduce the plot line of the new campaign. Describe the key locations within the location, including taverns, shops, and government buildings. For all ability checks needed within the adventure hook, provide difficulty checks according to standard dungeon's and dragons DC rules.` }
                    ],
                    model: "gpt-3.5-turbo",
                    functions: [
                        {
                            name: "createAdventureHook",
                            parameters: {
                                type: "object",
                                properties: {
                                    "title": {
                                        type: "string"
                                    }, 
                                    "locationDescription": {
                                        type: "string"
                                    }, 
                                    "keyLocations": {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: { 
                                                "name": {
                                                    type: "string"
                                                }, 
                                                "description": {
                                                    type: "string"
                                                }
                                            }
                                        }
                                    }, 
                                    "keyFigures": {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                "name": {
                                                    type: "string"
                                                }, 
                                                "description": {
                                                    type: "string"
                                                }
                                            }
                                        }
                                    }, 
                                    "eventDescription": {
                                        type: "string"
                                    }
                                },
                                required: ["title", "locationDescription", "keyLocations", "keyFigures", "eventDescription"]
                            }
                        }
                    ],
                    function_call: {
                        name: "createAdventureHook"
                    }
                });
                
                const content = completion.choices[0].message.function_call
                if (content != null) {
                    try {
                        logger.log("Received adventure hook from OpenAI: " + content.arguments)
                        const jsonResponse: AdventureHook = JSON.parse(content.arguments)
                        var responseHTML = ``
                        responseHTML += `<h2>${jsonResponse.title}</h2>\n`
                        
                        const locationParagraphs = this.parseStringIntoParagraphs(jsonResponse.locationDescription)
                        locationParagraphs.forEach(value => {
                            responseHTML += `<p>${value}</p>\n`
                        })

                        responseHTML += `<h3>Key Locations</h3>`
                        jsonResponse.keyLocations.forEach(location => {
                            responseHTML += `<h4>${location.name}</h4>`
                            const keyLocationParagraphs = this.parseStringIntoParagraphs(location.description)
                            keyLocationParagraphs.forEach(value => {
                                responseHTML += `<p>${value}</p>`
                            })
                        })

                        responseHTML += `<h3>Key Figures</h3>`
                        jsonResponse.keyFigures.forEach(figure => {
                            responseHTML += `<h4>${figure.name}</h4>`
                            const keyFigureParagraphs = this.parseStringIntoParagraphs(figure.description)
                            keyFigureParagraphs.forEach(value => {
                                responseHTML += `<p>${value}</p>`
                            })
                        })

                        responseHTML += `<h3>The Adventurers Come Together</h3>`
                        const eventParagraphs = this.parseStringIntoParagraphs(jsonResponse.eventDescription)
                        eventParagraphs.forEach(value => {
                            responseHTML += `<p>${value}</p>`
                        })

                        resolve(responseHTML)
                    } catch (error) {
                        logger.log("failed to parse adventure hook: " + error + content.arguments)
                        reject(error)
                    }
                } else {
                    reject(new Error("Generated adventure hook is null"))
                    return
                }
            } catch (error) {
                logger.log("Failed to create adventure hook due to error: " + error)
                reject(error)
            }
        })
    }

    private async generateAdventureArcs(form: CampaignFormResponse): Promise<string> {
        return new Promise(async (resolve, reject) => {
            var content = ``
            var expectedLevel = form.startingLevel

            const adventureLevelIncrease = 2
            const numArcs = this.determineNumberOfAdventureArcs(form.numPlayerCharacters, form.endingLevel - form.startingLevel)
            
            try {
                for (var i = 0; i < numArcs; i++) {
                    if (i === numArcs - 1) {
                        const adventure = await this.generateFinalCampaignAdventureArc(form, expectedLevel)
                        content += adventure
                    } else {
                        const adventure = await this.generateMidCampaignAdventureArc(form, expectedLevel, this.previousAdventureType)
                        content += adventure
                    }

                    expectedLevel = Math.min(form.endingLevel, expectedLevel + adventureLevelIncrease)
                }

                resolve(content)
            } catch(error) {
                logger.log("failed to generate campaign acrs: " + error + content)
                reject(error)
            }
        })
    }

    private async generateMidCampaignAdventureArc(form: CampaignFormResponse, currentLevel: number, previousAdventureType: AdventureType): Promise<string> {
        logger.log("Generating a mid cmapaign adventure arc")
        return new Promise(async (resolve, reject) => {
            const adventureType = this.determineAdventureType(previousAdventureType)
            this.previousAdventureType = adventureType
            try {
                if (adventureType == AdventureType.DUNGEON) {
                    resolve(await this.generateDungeonAdventureArc(form, currentLevel))
                } else if (adventureType == AdventureType.SIDEQUEST) {
                    resolve(await this.generateSideQuestAdventureArc(form, currentLevel))
                } else {
                    resolve(await this.generateTravelAdventureArc(form, currentLevel))
                }
            } catch(error) {
                logger.log("failed to generate mid campaign adventure arc: " + error)
                reject(error)
            }
        })
    }

    private async generateDungeonAdventureArc(form: CampaignFormResponse, currentLevel: number): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                logger.log("Sending dungeon adventure arc generation request to Open AI")

                const numberOfChambers = this.determineNumberOfEventsInAdventure(form.numPlayerCharacters, currentLevel)

                var generationRequest = `
                    the group of adventurers are directed a lair or a dungeon. Generate a dungeon with ${numberOfChambers} for the adventurers to traverse, searching for something related to their quest
                    Describe the background of what drew the adventurers to the dungeon and what they are seeking within the dungeon.
                    The first chamber of the dungeon should describe how the adventurers enter the lair.
                    The final chamber of the dungeon should house a significant challenge for the adventurers, and provides what they seek within the dungeon.
                    For each chamber, note the exits and entrances, and to which other chambers the current one adjoins.
                `

                for (var i = 0; i < numberOfChambers; i++) {
                    const chamberType = this.determineEventType(form)

                    switch (chamberType) {
                        case EventType.COMBAT: {
                            generationRequest += `
                            In chamber ${i + 1}, describe enemies the adventurers have to fight. What are their species? Where are they located? Are they hiding? How many of each enemey are in this location? Describe the scene the adventurers find themselves in.
                            `
                            break;
                        }
                        case EventType.PUZZLE: {
                            generationRequest += `
                            In chamber ${i + 1}, describe a puzzle the adventurers have to solve. Perhaps they need to find an object hidden in the room, or move a specific object. Perhaps they all need to orient themselves in the chamber in some fashion. Describe the scene the adventurers find themselves in and then describe the proposed solution. Note any ability checks the adventurers may need to make and what the difficulty of those checks would be according to standard dungeons and dragons difficult check ratings.
                            `
                            break;
                        }
                        case EventType.TRAP: {
                            generationRequest += `
                            In chamber ${i + 1}, describe a trap the adventurers have to avoid. Describe the scene the adventurers find themselves in. Note any ability checks the adventurers need to make in order to avoid the trap. Note the consequences faced if the users fail the ability checks. Do they take damage? If so, how much damage as represented in increments of d4, d6, d8, or d12 dice. Do enemies appear? If so, what enemies arrive? Where do they come from? How many enemies arrive?
                            `
                            break;
                        }
                        default: break;
                    }
                }

                generationRequest += `
                    Describe what the adventurers learn about their quest by traversing the dungeon as well as any rewards they find, including currency, valuables, weapons, or other treasure.
                `

                const completion = await this.openai.chat.completions.create({
                    messages: [{ role: "user", content: generationRequest }],
                    model: "gpt-3.5-turbo",
                    functions: [
                        {
                            name: "createDungeon",
                            parameters: {
                                type: "object",
                                properties: {
                                    "chapterTitle": {
                                        type: "string"
                                    },
                                    "chapterIntroduction": {
                                        type: "string"
                                    },
                                    "chambers": {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                "chamberName": {
                                                    type: "string"
                                                },
                                                "chamberDescription": {
                                                    type: "string"
                                                },
                                                "chamberEvent": {
                                                    type: "string"
                                                }
                                            }
                                        }
                                    },
                                    "rewards": {
                                        type: "string"
                                    }
                                },
                                required: ["chapterTitle", "chapterIntroduction", "chambers", "rewards"]
                            }
                        }
                    ],
                    function_call: {
                        name: "createDungeon"
                    }
                });
                
                const content = completion.choices[0].message.function_call
    
                if (content != null) {
                    logger.log("Received dungeon adventure arc from OpenAI: " + content.arguments)

                    try {
                        const jsonResponse: DungeonArc = JSON.parse(content.arguments)

                        var output = ``
                        output += `<h1>${jsonResponse.chapterTitle}</h1>`

                        const descriptionParagraphs = this.parseStringIntoParagraphs(jsonResponse.chapterIntroduction)
                        for(var i = 0; i < descriptionParagraphs.length; i++) {
                            if (i == 0) {
                                output += `<p class="firstText">${descriptionParagraphs[i]}</p>\n`
                            } else {
                                output += `<p>${descriptionParagraphs[i]}</p>\n`
                            }
                        }

                        jsonResponse.chambers.forEach(chamber => {
                            output += `<h2>${chamber.chamberName}</h2>`
                            const chamberDescription = this.parseStringIntoParagraphs(chamber.chamberDescription)
                            chamberDescription.forEach(element => {
                                output += `<p>${element}</p>`
                            });

                            const chamberEvent = this.parseStringIntoParagraphs(chamber.chamberEvent)
                            chamberEvent.forEach(element => {
                                output += `<p>${element}</p>`
                            });
                        });

                        const reward = this.parseStringIntoParagraphs(jsonResponse.rewards)
                        reward.forEach(element => {
                            output += `<p>${element}</p>`
                        });

                        resolve(output)
                    } catch (error) {
                        logger.log("failed to dungeon campaign arc: " + error + content.arguments)
                        reject(error)
                    }
                } else {
                    reject(new Error("Generated dungeon adventure arc was null"))
                }
            } catch (error) {
                logger.log("Failed to create dungeon due to error: " + error)
                reject(error)
            }
        })
    }

    private async generateSideQuestAdventureArc(form: CampaignFormResponse, currentLevel: number): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                logger.log("Sending side quest adventure arc generation request to Open AI")
                const numberOfSideQuests = this.determineNumberOfEventsInAdventure(form.numPlayerCharacters, currentLevel)

                const generationRequest = `
                    the group of adventurers have arrived somewhere while on their quest. The citizens here need help from the adventurers for some reason or another.
                    generate ${numberOfSideQuests} quests provided by different citizens. For each citizen, describe where they live, what they do for a living, their family's background, the issue their facing, their request, and the reward they are offering for the adventurer's services.
                    Also include a conclusion to this arc of the adventure, directing the adventurers to the next phase of their adventure.
                    Do not include a chapter number in the chapter title.
                `

                const completion = await this.openai.chat.completions.create({
                    messages: [{ role: "user", content: generationRequest }],
                    model: "gpt-3.5-turbo",
                    functions: [
                        {
                            name: "createSideQuests",
                            parameters: {
                                type: "object",
                                properties: {
                                    "chapterTitle": {
                                        type: "string"
                                    },
                                    "chapterIntroduction": {
                                        type: "string"
                                    },
                                    "sidequests": {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                "questTitle": {
                                                    type: "string"
                                                },
                                                "questGiverBackground": {
                                                    type: "string"
                                                },
                                                "sideQuestBackground": {
                                                    type: "string"
                                                },
                                                "sideQuestRequest": {
                                                    type: "string"
                                                },
                                                "proposedReward": {
                                                    type: "string"
                                                }
                                            }
                                        }
                                    },
                                    "chapterConclusion": {
                                        type: "string"
                                    },
                                },
                                required: ["chapterTitle", "chapterIntroduction", "sidequests", "chapterConclusion"]
                            }
                        }
                    ],
                    function_call: {
                        name: "createSideQuests"
                    }
                });
                
                const content = completion.choices[0].message.function_call

                if (content != null) {
                    logger.log("Received side quest adventure arc from OpenAI: " + content.arguments)

                    try {
                        const jsonResponse: SideQuestArc = JSON.parse(content.arguments)

                        var output = ``
                        output += `<h1>${jsonResponse.chapterTitle}</h1>`

                        const descriptionParagraphs = this.parseStringIntoParagraphs(jsonResponse.chapterIntroduction)
                        for(var i = 0; i < descriptionParagraphs.length; i++) {
                            if (i == 0) {
                                output += `<p class="firstText">${descriptionParagraphs[i]}</p>\n`
                            } else {
                                output += `<p>${descriptionParagraphs[i]}</p>\n`
                            }
                        }

                        jsonResponse.sidequests.forEach(element => {
                            output += `<h2>${element.questTitle}</h2>`
                            
                            const questGiverBackgroundParagraphs = this.parseStringIntoParagraphs(element.questGiverBackground)
                            questGiverBackgroundParagraphs.forEach(element => {
                                output += `<p>${element}</p>`
                            });

                            const questBackgroundParagraphs = this.parseStringIntoParagraphs(element.sideQuestBackground)
                            questBackgroundParagraphs.forEach(element => {
                                output += `<p>${element}</p>`
                            });

                            const requestParagraphs = this.parseStringIntoParagraphs(element.sideQuestRequest)
                            requestParagraphs.forEach(element => {
                                output += `<p>${element}</p>`
                            });

                            const rewardParagraphs = this.parseStringIntoParagraphs(element.proposedReward)
                            rewardParagraphs.forEach(element => {
                                output += `<p>${element}</p>`
                            });
                        });

                        output += `<h2>Back On Their Quest</h2>`
                        const conclusion = this.parseStringIntoParagraphs(jsonResponse.chapterConclusion)
                        conclusion.forEach(element => {
                            output += `<p>${element}</p>`
                        });

                        resolve(output)
                    } catch (error) {
                        logger.log("failed to side quest adventure arc: " + error + content.arguments)
                        reject(error)
                    }
                } else {
                    reject(new Error("The side quest campaign arc was null"))
                }
            } catch (error) {
                logger.log("Failed to create side quest due to error: " + error)
                reject(error)
            }
        })
    }

    private async generateTravelAdventureArc(form: CampaignFormResponse, currentLevel: number): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                logger.log("Sending travel adventure arc generation request to Open AI")

                const generationRequest = `
                    the group of adventurers must travel to a different area of the setting to accomplish their quest. Describe why the adventurers must travel to that location.
                    Describe the location to which the adventurers must travel. Add details for the key locations at the new location, including taverns, shops, and government buildings.
                    Include the potential modes of transportation the adventurers can use to reach their destination according to what is available within the campaign setting. Detail how dangerous each path will be, how long the journey may take, and how much that mode of transportation would cost using standard dungeons and dragons currency.
                    Detail what potential monsters or hazards the adventures may encounter along their journey, including the probability of that encounter as a percentage and the consequence of the encounter, whether it lengthens the travel or makes the mode of transportation unusable. The probability of all hazards should add up to 60%.
                    Do not include a chapter number in the chapter title.
                `

                const completion = await this.openai.chat.completions.create({
                    messages: [{ role: "user", content: generationRequest }],
                    model: "gpt-3.5-turbo",
                    functions: [
                        {
                            name: "createTravel",
                            parameters: {
                                type: "object",
                                properties: {
                                    "chapterTitle": {
                                        type: "string"
                                    },
                                    "travelJustification": {
                                        type: "string"
                                    },
                                    "destinationName": {
                                        type: "string"
                                    },
                                    "destinationOverview": {
                                        type: "string"
                                    },
                                    "destinationDetails": {
                                        type: "string"
                                    },
                                    "modesOfTransport": {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                "name": {
                                                    type: "string"
                                                },
                                                "cost": {
                                                    type: "number"
                                                },
                                                "description": {
                                                    type: "string"
                                                },
                                                "potentialHazards": {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            "name": {
                                                                type: "string"
                                                            },
                                                            "probability": {
                                                                type: "number"
                                                            },
                                                            "description": {
                                                                type: "string"
                                                            },
                                                            "consequence": {
                                                                type: "string"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "destinationKeyLocations": {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                "name": {
                                                    type: "string"
                                                },
                                                "description": {
                                                    type: "string"
                                                }
                                            }
                                        }
                                    }
                                },
                                required: ["chapterTitle", "travelJustification", "destinationName", "destinationOverview", "destinationDetails", "modesOfTransport", "destinationKeyLocations"]
                            }
                        }
                    ],
                    function_call: {
                        name: "createTravel"
                    }
                });
                
                const content = completion.choices[0].message.function_call
                if (content != null) {
                    logger.log("Received travel adventure arc from OpenAI: " + content.arguments)

                    try {
                        const jsonResponse: TravelAdventureArc = JSON.parse(content.arguments)

                        var output = ``
                        output += `<h1>${jsonResponse.chapterTitle}</h1>`

                        const travelJustificationParagraphs = this.parseStringIntoParagraphs(jsonResponse.travelJustification)
                        for(var i = 0; i < travelJustificationParagraphs.length; i++) {
                            if (i == 0) {
                                output += `<p class="firstText">${travelJustificationParagraphs[i]}</p>\n`
                            } else {
                                output += `<p>${travelJustificationParagraphs[i]}</p>\n`
                            }
                        }

                        const destinationOverviewParagraphs = this.parseStringIntoParagraphs(jsonResponse.destinationOverview)

                        if (destinationOverviewParagraphs != undefined) {
                            destinationOverviewParagraphs.forEach(element => {
                                output += `<p>${element}</p>`
                            });
                        }
                        
                        output += `<h2>Modes of Transportation</h2>`
                        if (jsonResponse.modesOfTransport != undefined) {
                            jsonResponse.modesOfTransport.forEach(element => {
                                output += `<h3>${element.name}</h3>`
                                output += `<div class="descriptive">Cost: ${element.cost} gold</div>`
                                
                                const transportationParagraphs = this.parseStringIntoParagraphs(element.description)

                                if (transportationParagraphs != undefined) {
                                    transportationParagraphs.forEach(element => {
                                        output += `<p>${element}</p>`
                                    });
                                }
    
                                output += `<h4>Potential Hazards</h4>\n`
                                output += `<p>At the beginning of each day of travel, roll 1d100. Compare the result to the table below. If the result isn't found on the table, the adventurers journey progresses smoothly.</p>`
                                output += `<table>`
                                
                                // Add table headers
                                output += `
                                <thead>
                                    <th>Name</th>
                                    <th>Roll</th>
                                    <th>Description</th>
                                    <th>Consequence</th>
                                </thead>`
    
                                // Add table body
                                output += `<tbody>`
    
                                // Add table rows
                                if (element.potentialHazards != undefined) {
                                    element.potentialHazards.forEach(hazard => {
                                        output += `
                                        <tr>
                                            <td>${hazard.name}</td>
                                            <td>${this.calculateTravelHazardDiceRolls(element.potentialHazards, hazard)}</td>
                                            <td>${hazard.description}</td>
                                            <td>${hazard.consequence}</td>
                                        </tr>
                                        `
                                    });
                                }
                                
                                // Close table body
                                output += `</tbody>`
    
                                output += `</table>`
                            });
                        }

                        output += `<h2>${jsonResponse.destinationName}</h2>`

                        const destionationDetailsParagraphs = this.parseStringIntoParagraphs(jsonResponse.destinationDetails)

                        if (destionationDetailsParagraphs != undefined) {
                            destionationDetailsParagraphs.forEach(element => {
                                output += `<p>${element}</p>`
                            });
                        }
                        
                        output += `<h3>Key Locations</h3>`

                        if (jsonResponse.destinationKeyLocations != undefined) {
                            jsonResponse.destinationKeyLocations.forEach(location => {
                                output += `<h4>${location.name}</h4>`
                                const keyLocationParagraphs = this.parseStringIntoParagraphs(location.description)
                                keyLocationParagraphs.forEach(value => {
                                    output += `<p>${value}</p>`
                                })
                            });
                        }

                        resolve(output)
                    } catch (error) {
                        logger.log("failed to generate travel adventure arc: " + error + content.arguments)
                        reject(error)
                    }
                } else {
                    reject(new Error("New travel campaign content was null"))
                }
            } catch (error) {
                logger.log("Failed to create travel due to error: " + error)
                reject(error)
            }
            
        })
    }

    private calculateTravelHazardDiceRolls(hazards: Hazard[], currentHazard: Hazard): string {
        var startRoll = 1

        for(var i = 0; i < hazards.length; i++) {
            const hazard = hazards[i];
            
            if (hazard === currentHazard) {
                return `${startRoll} - ${startRoll + hazard.probability}`
            } else {
                startRoll += hazard.probability
            }
        }

        return ``
    }

    private async generateFinalCampaignAdventureArc(form: CampaignFormResponse, currentLevel: number): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                logger.log("Sending final adventure arc generation request to Open AI")

                const numberOfChambers = this.determineNumberOfEventsInAdventure(form.numPlayerCharacters, currentLevel)

                var generationRequest = `
                    The adventurers are at the final leg of the quest. Generate a dungeon with ${numberOfChambers} for the adventurers to traverse, heading for the final conflict where the adventurers will achieve victory
                    Describe the background of what drew the adventurers to the dungeon and what they are seeking within the dungeon.
                    The first chamber of the dungeon should describe how the adventurers enter the lair.
                    The final chamber of the dungeon should house the climax of the entire campaign, a face off with the final boss who has caused the troubles during their entire adventure.
                    For each chamber, note the exits and entrances, and to which other chambers the current one adjoins.
                    Do not include a chapter number in the chapter title.
                `

                for (var i = 0; i < numberOfChambers; i++) {
                    if (i === numberOfChambers - 1) {
                        generationRequest += `
                            In the final chamber, describe enemies the adventurers have to fight and the final boss themselves. What are their species? Where are they located in the room? Are they hiding? How many of each enemey are in this location? Describe the scene the adventurers find themselves in. What special abilities does the final boss have?
                            `
                        break;
                    }
                    const chamberType = this.determineEventType(form)

                    switch (chamberType) {
                        case EventType.COMBAT: {
                            generationRequest += `
                            In chamber ${i + 1}, describe enemies the adventurers have to fight. What are their species? Where are they located? Are they hiding? How many of each enemey are in this location? Describe the scene the adventurers find themselves in.
                            `
                            break;
                        }
                        case EventType.PUZZLE: {
                            generationRequest += `
                            In chamber ${i + 1}, describe a puzzle the adventurers have to solve. Perhaps they need to find an object hidden in the room, or move a specific object. Perhaps they all need to orient themselves in the chamber in some fashion. Describe the scene the adventurers find themselves in and then describe the proposed solution. Note any ability checks the adventurers may need to make and what the difficulty of those checks would be according to standard dungeons and dragons difficult check ratings.
                            `
                            break;
                        }
                        case EventType.TRAP: {
                            generationRequest += `
                            In chamber ${i + 1}, describe a trap the adventurers have to avoid. Describe the scene the adventurers find themselves in. Note any ability checks the adventurers need to make in order to avoid the trap. Note the consequences faced if the users fail the ability checks. Do they take damage? If so, how much damage as represented in increments of d4, d6, d8, or d12 dice. Do enemies appear? If so, what enemies arrive? Where do they come from? How many enemies arrive?
                            `
                            break;
                        }
                        default: {
                            generationRequest += `
                            In chamber ${i + 1}, describe a seemingly empty room. Describe the scene the adventurers find themselves in. What can the adventurers find within the room. Note any ability checks the adventurers need to make in order to find certain items.
                            `
                        };
                    }
                }

                generationRequest += `
                    Describe what rewards the adventurers find by traversing the dungeon, including currency, valuables, weapons, or other treasure.
                `

                const completion = await this.openai.chat.completions.create({
                    messages: [{ role: "user", content: generationRequest }],
                    model: "gpt-3.5-turbo",
                    functions: [
                        {
                            name: "createDungeon",
                            parameters: {
                                type: "object",
                                properties: {
                                    "chapterTitle": {
                                        type: "string"
                                    },
                                    "chapterIntroduction": {
                                        type: "string"
                                    },
                                    "chambers": {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                "chamberName": {
                                                    type: "string"
                                                },
                                                "chamberDescription": {
                                                    type: "string"
                                                },
                                                "chamberEvent": {
                                                    type: "string"
                                                }
                                            }
                                        }
                                    },
                                    "rewards": {
                                        type: "string"
                                    }
                                },
                                required: ["chapterTitle", "chapterIntroduction", "chambers", "rewards"]
                            }
                        }
                    ],
                    function_call: {
                        name: "createDungeon"
                    }
                });
                
                const content = completion.choices[0].message.function_call
                if (content != null) {
                    logger.log("Received final adventure arc from OpenAI: " + content.arguments)

                    try {
                        const jsonResponse: DungeonArc = JSON.parse(content.arguments)

                        var output = ``
                        output += `<h1>${jsonResponse.chapterTitle}</h1>`

                        const descriptionParagraphs = this.parseStringIntoParagraphs(jsonResponse.chapterIntroduction)
                        for(var i = 0; i < descriptionParagraphs.length; i++) {
                            if (i == 0) {
                                output += `<p class="firstText">${descriptionParagraphs[i]}</p>\n`
                            } else {
                                output += `<p>${descriptionParagraphs[i]}</p>\n`
                            }
                        }

                        jsonResponse.chambers.forEach(chamber => {
                            output += `<h2>${chamber.chamberName}</h2>`
                            const chamberDescription = this.parseStringIntoParagraphs(chamber.chamberDescription)
                            chamberDescription.forEach(element => {
                                output += `<p>${element}</p>`
                            });

                            const chamberEvent = this.parseStringIntoParagraphs(chamber.chamberEvent)
                            chamberEvent.forEach(element => {
                                output += `<p>${element}</p>`
                            });
                        });

                        const reward = this.parseStringIntoParagraphs(jsonResponse.rewards)
                        reward.forEach(element => {
                            output += `<p>${element}</p>`
                        });

                        resolve(output)
                    } catch (error) {
                        logger.log("failed to generate final adventure arc: " + error + content.arguments)
                        reject(error)
                    }
                } else {
                    reject(new Error("Generated final adventure arc was null"))
                }
            } catch (error) {
                logger.log("Failed to create final arc due to error: " + error)
                reject(error)
            }
        })
    }

    private async generateFinalResolution(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                logger.log("Sending final resolution generation request to Open AI")

                var generationRequest = `
                    Now that the adventurers have finished their quest, describe how the world has changed because of their heroic actions. What rewards have they received? Are they given any special honors?
                    Do not include a chapter number in the chapter title.
                `

                const completion = await this.openai.chat.completions.create({
                    messages: [{ role: "user", content: generationRequest }],
                    model: "gpt-3.5-turbo",
                    functions: [
                        {
                            name: "createResolution",
                            parameters: {
                                type: "object",
                                properties: {
                                    "chapterTitle": {
                                        type: "string"
                                    },
                                    "resolution": {
                                        type: "string"
                                    },
                                },
                                required: ["chapterTitle", "resolution"]
                            }
                        }
                    ],
                    function_call: {
                        name: "createResolution"
                    }
                });
                
                const content = completion.choices[0].message.function_call

                if (content != null) {
                    logger.log("Received final resolution from OpenAI: " + content.arguments)

                    try {
                        const jsonResponse: FinalResolution = JSON.parse(content.arguments)

                        var output = ``
                        output += `<h1>${jsonResponse.chapterTitle}</h1>`

                        const resolutionParagraphs = this.parseStringIntoParagraphs(jsonResponse.resolution)
                        for(var i = 0; i < resolutionParagraphs.length; i++) {
                            if (i == 0) {
                                output += `<p class="firstText">${resolutionParagraphs[i]}</p>\n`
                            } else {
                                output += `<p>${resolutionParagraphs[i]}</p>\n`
                            }
                        }

                        resolve(output)
                    } catch (error) {
                        logger.log("failed to parse final resolution: " + error + content.arguments)
                        reject(error)
                    }
                } else {
                    reject(new Error("Genrated final resolution was null"))
                }
            } catch (error) {
                logger.log("Failed to create resolution due to error: " + error)
                reject(error)
            }
        })
    }

    // The number of adventure arcs assumes the players each gain 2 levels per adventure arc
    private determineNumberOfAdventureArcs(numPlayers: number, numLevels: number): number {
        const result = Math.min(Math.floor(numLevels / 2), 1) + Math.min(numPlayers, 5)
        logger.log(`Generating ${result} adventure arcs`)
        return result
    }
    
    private determineAdventureType(previousAdventureType: AdventureType): AdventureType {
        const randomEnumValue = (enumeration: any) => {
            const values = Object.keys(enumeration).filter(element => element != String(previousAdventureType))
            const enumKey = values[Math.floor(Math.random() * values.length)];
            return enumeration[enumKey];
        }
        
        return randomEnumValue(AdventureType) 
    }

    private determineNumberOfEventsInAdventure(numPlayers: number, level: number): number {
        // Assuming the level is the current average level of the players
        // The number events should be the twice the number of players plus the current level of the players / 4 with a minimum of 1
        const levelOffset = Math.min(Math.floor(level / 5), 1)
        const result = Math.min((2 * numPlayers), 5) + levelOffset
        logger.log(`Generating ${result} events within the adventure`)
        return result
    }

    private determineEventType(preferences: CampaignFormResponse): EventType {
        const defaultWeight = 2
        var eventWeight: EventType[] = []
        
        // Combat
        for (var i = 0; i < (defaultWeight + preferences.combatScale); i++) {
            eventWeight.push(EventType.COMBAT)
        }

        // Trap
        for (var i = 0; i < (defaultWeight + preferences.trapScale); i++) {
            eventWeight.push(EventType.TRAP)
        }

        // Puzzle
        for (var i = 0; i < (defaultWeight + preferences.puzzleScale); i++) {
            eventWeight.push(EventType.PUZZLE)
        }

        // Role Playing
        for (var i = 0; i < (defaultWeight + preferences.rolePlayingScale); i++) {
            eventWeight.push(EventType.ROLEPLAYING)
        }

        return eventWeight[Math.floor(Math.random()*eventWeight.length)];
    }
}

enum EventType {
    ROLEPLAYING, COMBAT, PUZZLE, TRAP
}
enum AdventureType {
    TRAVEL, DUNGEON, SIDEQUEST
}
