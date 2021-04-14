import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateEventTemplateArgs } from "./CreateEventTemplateArgs";
import { UpdateEventTemplateArgs } from "./UpdateEventTemplateArgs";
import { DeleteEventTemplateArgs } from "./DeleteEventTemplateArgs";
import { EventTemplateFindManyArgs } from "./EventTemplateFindManyArgs";
import { EventTemplateFindUniqueArgs } from "./EventTemplateFindUniqueArgs";
import { EventTemplate } from "./EventTemplate";
import { EventPictureFindManyArgs } from "../../eventPicture/base/EventPictureFindManyArgs";
import { EventPicture } from "../../eventPicture/base/EventPicture";
import { User } from "../../user/base/User";
import { EventTemplateService } from "../eventTemplate.service";

@graphql.Resolver(() => EventTemplate)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class EventTemplateResolverBase {
  constructor(
    protected readonly service: EventTemplateService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [EventTemplate])
  @nestAccessControl.UseRoles({
    resource: "EventTemplate",
    action: "read",
    possession: "any",
  })
  async eventTemplates(
    @graphql.Args() args: EventTemplateFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EventTemplate[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EventTemplate",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => EventTemplate, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "EventTemplate",
    action: "read",
    possession: "own",
  })
  async eventTemplate(
    @graphql.Args() args: EventTemplateFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EventTemplate | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "EventTemplate",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => EventTemplate)
  @nestAccessControl.UseRoles({
    resource: "EventTemplate",
    action: "create",
    possession: "any",
  })
  async createEventTemplate(
    @graphql.Args() args: CreateEventTemplateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EventTemplate> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "EventTemplate",
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
        `providing the properties: ${properties} on ${"EventTemplate"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        teacher: args.data.teacher
          ? {
              connect: args.data.teacher,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => EventTemplate)
  @nestAccessControl.UseRoles({
    resource: "EventTemplate",
    action: "update",
    possession: "any",
  })
  async updateEventTemplate(
    @graphql.Args() args: UpdateEventTemplateArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EventTemplate | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "EventTemplate",
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
        `providing the properties: ${properties} on ${"EventTemplate"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          teacher: args.data.teacher
            ? {
                connect: args.data.teacher,
              }
            : undefined,
        },
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

  @graphql.Mutation(() => EventTemplate)
  @nestAccessControl.UseRoles({
    resource: "EventTemplate",
    action: "delete",
    possession: "any",
  })
  async deleteEventTemplate(
    @graphql.Args() args: DeleteEventTemplateArgs
  ): Promise<EventTemplate | null> {
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

  @graphql.ResolveField(() => [EventPicture])
  @nestAccessControl.UseRoles({
    resource: "EventTemplate",
    action: "read",
    possession: "any",
  })
  async eventPictures(
    @graphql.Parent() parent: EventTemplate,
    @graphql.Args() args: EventPictureFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<EventPicture[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EventPicture",
    });
    const results = await this.service.findEventPictures(parent.id, args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "EventTemplate",
    action: "read",
    possession: "any",
  })
  async teacher(
    @graphql.Parent() parent: EventTemplate,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getTeacher(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
