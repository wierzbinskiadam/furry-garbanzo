import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { EventPictureServiceBase } from "./base/eventPicture.service.base";

@Injectable()
export class EventPictureService extends EventPictureServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
