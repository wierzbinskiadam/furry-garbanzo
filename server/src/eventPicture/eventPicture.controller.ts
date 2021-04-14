import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EventPictureService } from "./eventPicture.service";
import { EventPictureControllerBase } from "./base/eventPicture.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("event-pictures")
@common.Controller("event-pictures")
export class EventPictureController extends EventPictureControllerBase {
  constructor(
    protected readonly service: EventPictureService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
