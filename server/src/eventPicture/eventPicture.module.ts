import { Module } from "@nestjs/common";
import { EventPictureModuleBase } from "./base/eventPicture.module.base";
import { EventPictureService } from "./eventPicture.service";
import { EventPictureController } from "./eventPicture.controller";
import { EventPictureResolver } from "./eventPicture.resolver";

@Module({
  imports: [EventPictureModuleBase],
  controllers: [EventPictureController],
  providers: [EventPictureService, EventPictureResolver],
  exports: [EventPictureService],
})
export class EventPictureModule {}
