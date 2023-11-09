# Dungeon Forge Backend

## Background

As a new dungeon master in my local Dungeons and Dragons group, I find it difficult to be creative and design campaigns that will be interesting, engaging, and entertaining for the players involved. Dungeon masters often spend weeks researching, planning, and designing the world in which their players will adventure. However, that much time and effort is extremely difficult to expend, especially when balancing their every day schedule.

To simplify the campaign creation process and reduce the load on dungeon masters, the Dungeon Forge application generates new campaigns for users. Displayed in a format most Dungeons and Dragons players are familiar with, dungeon masters can follow the generated campaigns with their group. By filling in information about the campaign they want to create, dungeon masters receive a new campaign generated for them.

## Project

This repository contains the code used to generate new campaigns for those who request a campaign. The features of the server include the following:
- Resource Database - Generating campaigns requires an understanding of the available monsters, abilities, and items available to be used within the campaign
- Multiple Adventure Arcs - Campaigns typically last a long time due to the number of adventure arcs and tasks the adventurers can complete. The generated campaign should provide enough content to allow the party to reach their goals
- Weighted Encounters - Dungeon Masters know their group more than the generation algorithm. Therefore encounters should be weighted within each adventure arc so groups who prefer one style of play will encounter more scenarios that meet that style
- Custom Environments - One of the most difficult aspects of campaign creation is defining the setting for the campaign. The campaign should be generated in a new campaign environment
