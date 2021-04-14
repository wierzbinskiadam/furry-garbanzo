import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateEventPictureArgs } from "./CreateEventPictureArgs";
import { UpdateEventPictureArgs } from "./UpdateEventPictureArgs";
import { DeleteEventPictureArgs } from "./DeleteEventPictureArgs";
import { EventPictureFindManyArgs } from "./EventPictureFindManyArgs";
import { EventPictureFindUniqueArgs } from "./EventPictureFindUniqueArgs";
import { EventPicture } from "./EventPicture";
import { EventTemplateFindManyArgs } from "../../eventTemplate/base/EventTemplateFindManyArgs";
import { EventTemplate } from "../../eventTemplate/base/EventTemplate";
import { EventPictureService } from "../eventPicture.service";

@graphql.Resolver(() => EventPicture)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class EventPictureResolverBase {
  constructor(
    protected readonly service: EventPictureService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [EventPicture])
  @nestAccessControl.UseRoles({
    resource: "EventPicture",
    action: "read",
    possession: "any",
  })
  async eventPictures(
    @graphql.Args() args: EventPictureFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EventPicture[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EventPicture",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => EventPicture, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "EventPicture",
    action: "read",
    possession: "own",
  })
  async eventPicture(
    @graphql.Args() args: EventPictureFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EventPicture | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "EventPicture",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => EventPicture)
  @nestAccessControl.UseRoles({
    resource: "EventPicture",
    action: "create",
    possession: "any",
  })
  async createEventPicture(
    @graphql.Args() args: CreateEventPictureArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EventPicture> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "EventPicture",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"EventPicture"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => EventPicture)
  @nestAccessControl.UseRoles({
    resource: "EventPicture",
    action: "update",
    possession: "any",
  })
  async updateEventPicture(
    @graphql.Args() args: UpdateEventPictureArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EventPicture | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "EventPicture",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"EventPicture"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => EventPicture)
  @nestAccessControl.UseRoles({
    resource: "EventPicture",
    action: "delete",
    possession: "any",
  })
  async deleteEventPicture(
    @graphql.Args() args: DeleteEventPictureArgs
  ): Promise<EventPicture | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => [EventTemplate])
  @nestAccessControl.UseRoles({
    resource: "EventPicture",
    action: "read",
    possession: "any",
  })
  async eventTemplateId(
    @graphql.Parent() parent: EventPicture,
    @graphql.Args() args: EventTemplateFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EventTemplate[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EventTemplate",
    });
    const results = await this.service.findEventTemplateId(parent.id, args);
    return results.map((result) => permission.filter(result));
  }
}
