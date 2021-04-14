import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { EventPictureResolverBase } from "./base/eventPicture.resolver.base";
import { EventPicture } from "./base/EventPicture";
import { EventPictureService } from "./eventPicture.service";

@graphql.Resolver(() => EventPicture)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class EventPictureResolver extends EventPictureResolverBase {
  constructor(
    protected readonly service: EventPictureService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
