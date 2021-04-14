import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EventTemplateService } from "./eventTemplate.service";
import { EventTemplateControllerBase } from "./base/eventTemplate.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("event-templates")
@common.Controller("event-templates")
export class EventTemplateController extends EventTemplateControllerBase {
  constructor(
    protected readonly service: EventTemplateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
