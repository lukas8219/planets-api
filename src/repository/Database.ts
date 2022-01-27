import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class Database {

    private client : PrismaClient = new PrismaClient();

    getPlanetDatabase(){
        return this.client.planet;
    }
}