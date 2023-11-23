import { Item } from "../../models/item";
import { Monster } from "../../models/monster";
import { DatabaseReading } from "./database-reading";
var mysql = require('mysql2');

export class RDSDatabaseAccess implements DatabaseReading {
    databaseURL = process.env.DB_URL
    databasePort = process.env.DB_PORT
    databaseUsername = process.env.DB_USERNAME
    databasePWD = process.env.DB_PWD

    con = mysql.createConnection({
        host: this.databaseURL,
        port: this.databasePort,
        user: this.databaseUsername,
        password: this.databasePWD
    });

    fetchPossibleMonsters(): Promise<[string]> {
        const query = "SELECT name FROM `dungeon-forge`.Monsters;"
        throw new Error("Method not implemented.");
    }
    fetchPossibleItems(): Promise<[string]> {
        const query = "SELECT name FROM `dungeon-forge`.Items;"
        throw new Error("Method not implemented.");
    }
    fetchMonsterDetails(monster: string): Promise<Monster> {
        const query = `SELECT * FROM \`dungeon-forge\`.Monsters WHERE name = '${monster}';`
        throw new Error("Method not implemented.");
    }
    fetchItemDetails(item: string): Promise<Item> {
        const query = `SELECT * FROM \`dungeon-forge\`.Items WHERE name = '${item}';`
        throw new Error("Method not implemented.");
    }
}