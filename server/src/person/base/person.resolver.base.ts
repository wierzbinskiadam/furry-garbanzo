import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreatePersonArgs } from "./CreatePersonArgs";
import { UpdatePersonArgs } from "./UpdatePersonArgs";
import { DeletePersonArgs } from "./DeletePersonArgs";
import { PersonFindManyArgs } from "./PersonFindManyArgs";
import { PersonFindUniqueArgs } from "./PersonFindUniqueArgs";
import { Person } from "./Person";
import { PersonService } from "../person.service";

@graphql.Resolver(() => Person)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class PersonResolverBase {
  constructor(
    protected readonly service: PersonService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Person])
  @nestAccessControl.UseRoles({
    resource: "Person",
    action: "read",
    possession: "any",
  })
  async people(
    @graphql.Args() args: PersonFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Person[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Person",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Person, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Person",
    action: "read",
    possession: "own",
  })
  async person(
    @graphql.Args() args: PersonFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Person | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Person",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Person)
  @nestAccessControl.UseRoles({
    resource: "Person",
    action: "create",
    possession: "any",
  })
  async createPerson(
    @graphql.Args() args: CreatePersonArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Person> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Person",
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
        `providing the properties: ${properties} on ${"Person"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Person)
  @nestAccessControl.UseRoles({
    resource: "Person",
    action: "update",
    possession: "any",
  })
  async updatePerson(
    @graphql.Args() args: UpdatePersonArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Person | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Person",
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
        `providing the properties: ${properties} on ${"Person"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Person)
  @nestAccessControl.UseRoles({
    resource: "Person",
    action: "delete",
    possession: "any",
  })
  async deletePerson(
    @graphql.Args() args: DeletePersonArgs
  ): Promise<Person | null> {
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
}
