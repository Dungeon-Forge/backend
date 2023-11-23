import { Item } from "../../models/item";
import { Monster } from "../../models/monster";

export abstract class DatabaseReading {
    abstract fetchPossibleMonsters(): Promise<[string]>
    abstract fetchPossibleItems(): Promise<[string]>
    abstract fetchMonsterDetails(monster: string): Promise<Monster>
    abstract fetchItemDetails(item: string): Promise<Item>
}