import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { PersonServiceBase } from "./base/person.service.base";

@Injectable()
export class PersonService extends PersonServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
