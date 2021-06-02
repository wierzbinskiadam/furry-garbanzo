import { PrismaService } from "nestjs-prisma";
import { Prisma, Person } from "@prisma/client";

export class PersonServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.PersonFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PersonFindManyArgs>
  ): Promise<number> {
    return this.prisma.person.count(args);
  }

  async findMany<T extends Prisma.PersonFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.PersonFindManyArgs>
  ): Promise<Person[]> {
    return this.prisma.person.findMany(args);
  }
  async findOne<T extends Prisma.PersonFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.PersonFindUniqueArgs>
  ): Promise<Person | null> {
    return this.prisma.person.findUnique(args);
  }
  async create<T extends Prisma.PersonCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PersonCreateArgs>
  ): Promise<Person> {
    return this.prisma.person.create<T>(args);
  }
  async update<T extends Prisma.PersonUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.PersonUpdateArgs>
  ): Promise<Person> {
    return this.prisma.person.update<T>(args);
  }
  async delete<T extends Prisma.PersonDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.PersonDeleteArgs>
  ): Promise<Person> {
    return this.prisma.person.delete(args);
  }
}
