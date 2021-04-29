import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PersonService } from "./person.service";
import { PersonControllerBase } from "./base/person.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("people")
@common.Controller("people")
export class PersonController extends PersonControllerBase {
  constructor(
    protected readonly service: PersonService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
