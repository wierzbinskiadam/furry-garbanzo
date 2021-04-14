import { Module } from "@nestjs/common";
import { EventTemplateModuleBase } from "./base/eventTemplate.module.base";
import { EventTemplateService } from "./eventTemplate.service";
import { EventTemplateController } from "./eventTemplate.controller";
import { EventTemplateResolver } from "./eventTemplate.resolver";

@Module({
  imports: [EventTemplateModuleBase],
  controllers: [EventTemplateController],
  providers: [EventTemplateService, EventTemplateResolver],
  exports: [EventTemplateService],
})
export class EventTemplateModule {}
