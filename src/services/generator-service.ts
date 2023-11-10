import { Adventure } from "../models/adventure";
import { Campaign } from "../models/campaign";
import { CampaignEvent } from "../models/campaign-event";
import { CampaignSetting } from "../models/campaign-setting";

export class GeneratorService {
    getCampaign(id: string): Campaign {
        return new Campaign(
            id,
            "Lost Mine of Phandelver",
            undefined,
            new CampaignSetting(
              0,
              "The Forgotten Realms",
              `<h1>The Forgotten Realms</h1>
              <p>Just like a fantasy novel or movie, an adventure is set in a larger world. In fact, the world can be anything that the DM and players can imagine. It could be a swords-andsorcery setting at the dawn of civilization, where barbarians battle evil sorcerers, or a post-apocalyptic fantasy where elves and dwarves wield magic amid the wreckage of a technological civilization. Most D&D settings are somewhere between those two extremes: worlds of medieval high fantasy with knights and castles, as well as elven cities, dwarven mines, and fearsome monsters.</p>
              <p>The world of the Forgotten Realms is one such setting, and that’s where the story in this adventure takes place. In the Realms, knights dare the crypts of the fallen dwarf kings of Delzoun, seeking glory and treasure. Rogues prowl the dark alleyways of teeming cities such as Neverwinter and Baldur’s Gate. Clerics in the service of gods wield mace and spell, questing against the terrifying powers that threaten the land. Wizards plunder the ruins of the fallen Netherese empire, delving into secrets too dark for the light of day. Dragons, giants, demons, and unimaginable abominations lurk in dungeons, caverns, ruined cities, and the vast wild places of the world.</p>
              <p>On the roads and rivers of the Realms travel minstrels and peddlers, merchants and guards, soldiers, sailors, and steel-hearted adventurers carrying tales of strange, glorious, faraway places. Good maps and clear trails can take even an inexperienced youth with dreams of glory far across the world. Thousands of restless would-be heroes from backcountry farmsteads and sleepy villages arrive in Neverwinter and the other great cities every year in search of wealth and renown.</p>
              <p>Known roads may be well traveled, but they aren’t necessarily safe. Fell magic, deadly monsters, and cruel local rulers are all perils that you face when you travel in the Forgotten Realms. Even farms and freeholds within a day’s walk of a city can fall prey to monsters, and no place is safe from the sudden wrath of a dragon.</p>
              <p>The regional map shows just a tiny part of this vast world, in a region called the Sword Coast. This is a region of adventure, where daring souls delve into the wreckage of ancient strongholds and explore ruins of long-lost cultures. Amid a wilderness of jagged, snow-capped peaks, alpine forests, lawlessness, and monsters, the coast holds the greatest bastions of civilization, including the coastal city of Neverwinter.</p>
              <div class="tip-board">
                  <h4>Roleplaying and Inspiration</h4>
                  <p>One of the things that you can do as the DM is reward players for roleplaying their characters well.</p>
                  <p>Each of the characters included in this set has two personality traits (one positive and one negative), an ideal, a bond, and a flaw. These elements can make the character easier and more fun to roleplay. <b>Personality traits</b> provide a glimpse into the character’s likes, dislikes, accomplishments, fears, attitude, or mannerisms. An <b>ideal</b> is something that the character believes in or strives for above all else. A character’s <b>bond</b> represents a connection to a person, place, or event in the world— someone the character cares about, a place the holds a special connection, or a treasured possession. A <b>flaw</b> is a characteristic that someone else can exploit to bring the character to ruin or cause the character to act against his or her best interests.</p>
                  <p>When a player roleplays a negative personality trait or gives in to a drawback presented by a bond or a flaw, you can give that player’s character one <b>inspiration</b> as a reward. The player can then spend it when his or her character makes an ability check, an attack roll, or a saving throw. Spending inspiration gives the character advantage on the roll. A clever player might spend the inspiration to counteract disadvantage on a roll.</p>
                  <p>A character can have only one inspiration at a time.</p>
              </div>
              <img src="https://mygamenightblog.files.wordpress.com/2019/04/phandelver-map-exterior-player.jpg?w=800&zoom=2">`,
              undefined
            ),
            new CampaignEvent(
              `
              <h1>Adventure Hook</h1>
              <p>You can let players invent their own reasons for visiting Phandalin, or you can use the following adventure hook. The backgrounds and secondary goals on the character sheets also provide characters with motivations for visiting Phandalin.</p>
              <p><b><em>Meet Me in Phandalin.</em></b> The characters are in the city of Neverwinter when their dwarf patron and friend, Gundren Rockseeker, hires them to escort a wagon to Phandalin. Gundren has gone ahead with a warrior, Sildar Hallwinter, to attend to business in the town while the characters follow with the supplies. The characters will be paid 10 gp each by the owner of Barthen’s Provisions in Phandalin when they deliver the wagon safely to that trading post.</p>
              `
            ),
            [
              new Adventure(
                [
                  new CampaignEvent(
                    `
                    <h1>Goblin Ambush</h1>
                    <p>Read the following boxed text to start the encounter:</p>
                    <div class="dm-quote">
                        <p>You’ve been on the Triboar Trail for about half a day. As you come around a bend, you spot two dead horses sprawled about fifty feet ahead of you, blocking the path. Each has several black-feathered arrows sticking out of it. The woods press close to the trail here, with a steep embankment and dense thickets on either side.</p>
                    </div>
                    <p>If you are using the “Meet Me in Phandalin” adventure hook, then any character who approaches to make a closer investigation can identify the horses as belonging to Gundren Rockseeker and Sildar Hallwinter. They’ve been dead about a day, and it’s clear that arrows killed the horses. When the characters inspect the scene closer, read the following:</p>
                    <div class="dm-quote">
                        <p>The saddlebags have been looted. Nearby lies an empty leather map case.</p>
                    </div>
                    <p>Four <b>goblins</b> are hiding in the woods, two on each side of the road. They wait until someone approaches the bodies and then attack.</p>
                    <img src="../../../assets/images/goblin.png">
                    <p>This will likely be the first of many combat encounters in the adventure. Here are the steps you should follow to run it effectively:</p>
                    <ul>
                        <li>Review the goblin stat block in appendix B. Since the goblins are hiding, you’ll need to know their Stealth skill modifier: +6.</li>
                        <li>Check to see who, if anyone, is surprised. The party cannot surprise the goblins, but the goblins might surprise some or all the characters. Make a Dexterity (Stealth) check for the goblins, rolling once for all of them. Roll a d20, add the goblins’ Stealth skill modifier (+6) to the roll, and compare the result to the characters’ passive Wisdom (Perception) scores. Any character whose score is lower than the goblins’ check result is surprised and loses his or her turn during the first round of combat (see “Surprise” in the rulebook).</li>
                        <li>Use the initiative rules in the rulebook to determine who acts first, second, third, and so on. Keep track of everyone’s initiative count in the margins of this book or on a separate piece of paper.</li>
                        <li>When the time comes for the goblins to act, two of them rush forward and make melee attacks while two goblins stand 30 feet away from the party and make ranged attacks. The goblins’ stat block contains the information you need to resolve these attacks. For more information on what the goblins can do on their turn, see chapter 2, “Combat,” in the rulebook.</li>
                        <li>When three goblins are defeated, the last goblin attempts to flee, heading for the goblin trail.</li>
                    </ul>
                    <h3>Developments</h3>
                    <p>In the unlikely event that the goblins defeat the adventurers, they leave them unconscious, loot them and the wagon, then head back to the Cragmaw hideout. The characters can continue on to Phandalin, buy new gear at Barthen’s Provisions, return to the ambush site, and find the goblins’ trail.</p>
                    <p>The characters might capture one or more goblins by knocking them unconscious instead of killing them. A character can use any melee weapon to knock a goblin unconscious, succeeding if the attack deals enough damage to drop the goblin to 0 hit points. Once it regains consciousness after a few minutes, a captured goblin can be convinced to share what it knows (see the “What the Goblins Know” sidebar on page 8). A goblin can also be persuaded to lead the party to the Cragmaw hideout while avoiding traps along the way (see the “Goblin Trail” section).</p>
                    <p>The characters might not find the goblin trail, or they could decide to continue to Phandalin. In that case, skip ahead to part 2, “Phandalin.” Elmar Barthen (the owner of Barthen’s Provisions) seeks out the characters and informs them that Gundren Rockseeker never arrived. He recounts the goblin troubles and suggests that the characters return to the ambush site to investigate further (after they rest). Barthen also tells the party that Linene Gray wind of the Lionshield Coster (see page 16) can provide more information on the goblin attacks.</p>
                    <div class="tip-board">
                        <h4>Rests</h4>
                        <p>The party might need to rest after the goblin ambush, depending on how the battle plays out. See the rulebook for more information on short rests and long rests.</p>
                    </div>
                    <h2>Goblin Trail</h2>
                    <p>After the characters defeat the goblins, any inspection of the area reveals that the creatures have been using this place to stage ambushes for some time. A trail hidden behind thickets on the north side of the road leads northwest. A character who succeeds on a DC 10 Wisdom (Survival) check recognizes that about a dozen goblins have come and gone along the trail, as well as signs of two human-sized bodies being hauled away from the ambush site.</p>
                    <p>The party can easily steer the wagon away from the road and tie off the oxen while the group pursues the goblins.</p>
                    <p>The trail leads five miles northwest and ends at the Cragmaw hideout (see that section). Ask the players to determine the party’s marching order as the characters move down the trail. The order is important, because the goblins have set two traps to thwart pursuers.</p>
                    <p><b>Snare.</b> About 10 minutes after heading down the trail, a party on the path encounters a hidden snare. If the characters are searching for traps, the character in the lead spots the trap automatically if his or her passive Wisdom (Perception) score is 12 or higher. Otherwise, the character must succeed on a DC 12 Wisdom (Perception) check to notice the trap. If the character fails to notice the trap, he or she triggers the snare and must succeed on a DC 10 Dexterity saving throw. On a failure, the character is suspended upside down 10 feet above the ground. The character is restrained until 1 or more slashing damage is dealt to the snare’s cord. (See the appendix in the rulebook for the effect of being restrained.) A character who isn’t carefully lowered down takes ld6 bludgeoning damage from the fall.</p>
                    <p><b>Pit.</b> Another 10 minutes down the trail is a pit the goblins have camouflaged. The pit is 6 feet wide, 10 feet deep, and it triggers when a creature moves across it. The character in the lead spots the hidden pit automatically if his or her passive Wisdom (Perception) score is 15 or higher. Otherwise, the character must succeed on a DC 15 Wisdom (Perception) check to spot the hidden pit. If the trap isn’t detected, the lead character must succeed on a DC 10 Dexterity saving throw or fall in, taking ld6 bludgeoning damage. The pit’s walls are not steep, so no ability check is required to scramble out.</p>
                    <h2>Awarding Experience Points</h2>
                    <p>Defeating the goblin ambushers and finding the Cragmaw hideout completes a story milestone. When the party arrives at the hideout, award each character 75 XP. Make sure the players record this gain on their character sheets.</p>
                    `
                  ),
                  new CampaignEvent(
                    `
                    <h1>Cragmaw Hideout</h1>
                    <p>The Cragmaw tribe of goblins has established a hideout from which it can easily harass and plunder traffic moving along the Triboar Trail or the path to Phandalin. The Cragmaw tribe is so named because each member of the tribe sharpens its teeth so they appear fierce and jagged.</p>
                    <p>The leader of the Cragmaw bandits lairing here is a bugbear named Klarg, who has orders from the chief of the Cragmaws to plunder any poorly defended caravans or travelers that come this way. A few days ago, a messenger from Cragmaw Castle brought new instructions: Waylay the dwarf Gundren Rockseeker and anyone traveling with him.</p>
                    <h2>General Features</h2>
                    <p>The Cragmaw cave slopes steeply upward. The entrance is at the foot of a good-sized hill, and the caves and passages are inside the hill itself.</p>
                    <p><b>Ceilings.</b> Most of the caves and passages have steeply sloping ceilings that create stalactite-covered vaults rising 20 to 30 feet above the floor.</p>
                    <p><b>Light.</b> Areas 1 and 2 are outside. The rest of the complex is dark unless stated otherwise. The boxed text for those locations assumes that the characters have darkvision or a light source.</p>
                    <p><b>Rubble.</b> Areas of crumbling rock and gravel are difficult terrain (see “Difficult Terrain” in the rulebook).</p>
                    <p><b>Sound.</b> The sound of water in the cave muffles noises to any creatures that aren’t listening carefully. Creatures can make a DC 15 Wisdom (Perception) check to attempt to hear activity in nearby chambers.</p>
                    <p><b>Stalagmites.</b> These upthrust spires of rock can provide cover (see “Cover” in the rulebook).</p>
                    <p><b>Stream.</b> The stream that flows through the complex is only 2 feet deep, cold, and slow moving, allowing creatures to easily wade through it.</p>
                    <div class="tip-board">
                        <h4>What the Goblins Know</h4>
                        <p>If the characters capture or charm any of the goblins here, the goblins can be persuaded to divulge some useful information:</p>
                        <ul>
                            <li>Fewer than twenty goblins currently dwell in the lair.</li>
                            <li>Their leader is a bugbear named Klarg. He answers to King Grol, chief of the Cragmaw tribe, who dwells in Cragmaw Castle. (The goblins can provide basic directions to Cragmaw Castle. It’s about twenty miles northeast of the Cragmaw hideout, in Neverwinter Wood.)</li>
                            <li>Klarg received a messenger goblin from King Crol a few days ago. The messenger told him that someone named the Black Spider was paying the Cragmaws to watch out for the dwarf Gundren Rockseeker, capture him, and send him and anything he was carrying back to King Grol. Klarg followed his orders. Gundren was ambushed and taken along with his personal effects, including a map.</li>
                            <li>The dwarf and his map were delivered to King Grol, as instructed. The dwarf’s human companion is being held in the “eating cave” (area 6).</li>
                        </ul>
                    </div>
                    <img src="https://mygamenightblog.files.wordpress.com/2019/04/phandelver-map-cragmaw-hideout-dm.jpg?w=800&zoom=2">
                    <h2>1. Cave Mouth</h2>
                    <p>The trail from the goblin ambush site leads to the entrance of the Cragmaw hideout.</p>
                    <div class="dm-quote">
                        <p>Following the goblins’ trail, you come across a large cave in a hillside five miles from the scene of the ambush. A shallow stream flows out of the cave mouth, which is screened by dense briar thickets. A narrow dry path leads into the cave on the right-hand side of the stream.</p>
                    </div>
                    <p>The thicket in area 2 is impenetrable from the west side of the stream.</p>
                    <h3>Developments</h3>
                    <p>The goblins in area 2 are supposed to be keeping watch on this area, but they are not paying attention. (Goblins can be lazy that way.) However, if the characters make a lot of noise here— for example, loudly arguing about what to do next, setting up a camp, cutting down brush, and so on— the goblins in area 2 notice and attack them through the thicket, which provides the goblins with three-quarters cover (see the rulebook for rules on cover).</p>
                    <h2>2. Goblin Blind</h2>
                    <p>When the characters cross to the east side of the stream, they can see around the screening thickets to area 2. This is a goblin guard post, though the goblins here are bored and inattentive.</p>
                    <div class="dm-quote">
                        <p>On the east side of the stream flowing from the cave mouth, a small area in the briar thickets has been hollowed out to form a lookout post or blind. Wooden planks flatten out the briars and provide room for guards to lie hidden and watch the area — including a pair of goblins lurking there right now!</p>
                    </div>
                    <p>Two <b>goblins</b> are stationed here. If the goblins notice intruders in area 1, they open fire with their bows, shooting through the thickets and probably catching the characters by surprise. If the goblins don’t notice the adventurers in area 1, they spot them when they splash across the stream, and neither side is surprised.</p>
                    <img src="../../../assets/images/goblin.png">
                    <p>Characters moving carefully or scouting ahead might be able to surprise the goblin lookouts. Have each character who moves ahead make a Dexterity (Stealth) check contested by the goblins’ passive Wisdom (Perception) score to avoid being surprised. See the rulebook for more information on ability check contests.</p>
                    <p><b>Thickets.</b> The thickets around the clearing are difficult terrain, but they aren’t dangerous— just annoying. They provide half cover to creatures attacking through them. (See “Difficult Terrain” and “Cover” in the rulebook for more information.)</p>
                    `
                  )
                ],
                "Part 1: Goblin Arrows",
                `
                <h1>Part 1: Goblin Arrows</h1>
                <p>The adventure begins as the player characters are escorting a wagon full of provisions and supplies from Neverwinter to Phandalin. The journey takes them south along the High Road to the Triboar Trail, which heads east (as shown on the overland map). When they’re a half-day’s march from Phandalin, they run into trouble with goblin raiders from the Cragmaw tribe.</p>
                <p>Read the boxed text when you’re ready to start. If you create a different adventure hook, skip to the second paragraph and adjust the details as necessary, ignoring the information about driving the wagon.</p>
                <div class="dm-quote">
                    <p>In the city of Neverwinter, a dwarf named Gundren Rockseeker asked you to bring a wagonload of provisions to the rough-and-tumble settlement of Phandalin, a couple of days’ travel southeast of the city. Gundren was clearly excited and more than a little secretive about his reasons for the trip, saying only that he and his brothers had found “something big,” and that he’d pay you ten gold pieces each for escorting his supplies safely to Barthen's Provisions, a trading post in Phandalin. He then set out ahead of you on horse, along with a warrior escort named Sildar Hallwinter, claiming he needed to arrive early to “take care of business.”</p>
                    <p>You’ve spent the last few days following the High Road south from Neverwinter, and you've just recently veered east along the Triboar Trail. You’ve encountered no trouble so far, but this territory can be dangerous. Bandits and outlaws have been known to lurk along the trail.</p>
                </div>
                <p>Before continuing with the adventure, take a few minutes to do the following:</p>
                <ul>
                    <li><p>Encourage the players to introduce their characters to each other if they haven’t done so already.</p></li>
                    <li><p>Ask the players to think about how their characters came to know their dwarf patron, Gundren Rockseeker. Let the players concoct their own stories. If a player is hard-pressed to think of anything, suggest something simple. For example, Gundren could be a childhood friend or someone who helped the player’s character get out of a tough scrape. This exercise is a great opportunity for the players to contribute to the adventure’s backstory.</p></li>
                    <li><p>Ask the players to give you the party’s marching order and how their characters are traveling. Who’s in front, and who’s bringing up the rear? If the characters are escorting Gundren’s wagonload of supplies, then one or two characters need to be driving the wagon. The rest of the characters can be riding on the wagon, walking alongside, or scouting ahead, as they like.</p></li>
                </ul>
                <h3>Driving the Wagon</h3>
                <p>Any character can drive a wagon, and no particular skill is necessary. Two oxen pull the wagon. If no one is holding the reins, the oxen stop where they are.</p>
                <p>The wagon is packed full of an assortment of mining supplies and food. This includes a dozen sacks of flour, several casks of salted pork, two kegs of strong ale, shovels, picks, and crowbars (about a dozen each), and five lanterns with a small barrel of oil (about fifty flasks in volume). The total value of the cargo is 100 gp.</p>
                <p>When you’re ready, continue with the “Goblin Ambush” section.</p>
                `
              )
            ],
            `
            <h1>Introduction</h1>
            <p>This book is written for the Dungeon Master. It contains a complete <i>Dungeons & Dragons</i> adventure, as well as descriptions for every creature and magic item that appears in the adventure. It also introduces the world of the Forgotten Realms, one of the game's most enduring settings, and it teaches you how to run a D&D game.</p>
            <p>The smaller book that accompanies this one (hereafter called "the rulebook") contains the rules you need to adjudicate situations that arise during the adventure.</p>
            <h1>Running the Adventure</h1>
            <p><i>Lost Mine of Phandelver</i> is an adventure for four to five characters of 1st level. during the course of the adventure, the characters will advance to 5th level. The adventure is set a short distance from the city of Neverwinter in the Sword Coast region of the Forgotten Realms setting. The Sword Coast is part of the North -- a vast realm of free settlements surrounded by wilderness and adventure. You don't need to be a Forgotten Realms expert to run the adventure; everything you need to know about the setting is contained in this book.</p>
            <p>If this is your first time running a D&D adventure, read "The Dungeon Master" section; it will help you better understand your role and responsibilities.</p>
            <p>The "Background section tells you everything you need to know to set up the adventure. The "Overview" section describes how the adventure is expected to run and gives you a broad sense of what the player characters should be doing at any given time.</p>
            <h2>The Dungeon Master</h2>
            <p>The Dungeon Master (DM) has a special role in the <i>Dungeons & Dragons</i> game.</p>
            <p>The DM is a <b>referee</b>. When it's not clear what ought to happen next, the DM decides how to apply the rules and keep the story going.</p>
            <p>The DM is a <b>narrator</b>. The DM sets the pace of the story and presents the various challenges and encounters the players must overcome. The DM is the players' interface to the D&D world, as well as the one who reads (and sometimes also writes) the adventure and decscribes what happens in response to the characters' actions.</p>
            <p>The DM <b>plays monsters</b>. The DM plays the monsters and villains the adventurers battle against, choosing their actions and rolling dice for their attacks. The DM also plays the part of all the other characters the players meet in the course of their adventurers, like the prisoner in the goblin lair or the inkeeper in town.</p>
            <p>Who should be the DM for your gaming group? Whoever wants to be! The person who has the most drive to pull a group together and start up a game often ends up being the DM by default, but that doesn't have to be the case.</p>
            <p>Although the DM controls the monsters and villains in the adventure, the relationship between the players and the DM isn’t adversarial. The DM ’s job is to challenge the characters with interesting encounters and tests, keep the game moving, and apply the rules fairly.</p>
            <p>The most important thing to remember about being a good DM is that the rules are a tool to help you have a good time. The rules aren’t in charge. You’re the DM— you’re in charge of the game. Guide the play experience and the use of the rules so that everybody has fun.</p>
            <p>Many players of Dungeons & Dragons find that being the DM is the best part of the game. With the information in this adventure, you’ll be prepared to take on that role for your group.</p>
            `,
            4,
            1,
            5
          )
    }
}