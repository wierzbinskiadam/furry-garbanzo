import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { EventTemplateResolverBase } from "./base/eventTemplate.resolver.base";
import { EventTemplate } from "./base/EventTemplate";
import { EventTemplateService } from "./eventTemplate.service";

@graphql.Resolver(() => EventTemplate)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class EventTemplateResolver extends EventTemplateResolverBase {
  constructor(
    protected readonly service: EventTemplateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
