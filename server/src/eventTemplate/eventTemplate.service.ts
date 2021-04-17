import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { EventTemplateServiceBase } from "./base/eventTemplate.service.base";

@Injectable()
export class EventTemplateService extends EventTemplateServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
