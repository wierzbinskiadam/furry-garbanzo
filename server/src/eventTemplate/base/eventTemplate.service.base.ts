import { PrismaService } from "nestjs-prisma";
import { Prisma, EventTemplate, EventPicture, User } from "@prisma/client";

export class EventTemplateServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.EventTemplateFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventTemplateFindManyArgs>
  ): Promise<EventTemplate[]> {
    return this.prisma.eventTemplate.findMany(args);
  }
  async findOne<T extends Prisma.EventTemplateFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventTemplateFindUniqueArgs>
  ): Promise<EventTemplate | null> {
    return this.prisma.eventTemplate.findUnique(args);
  }
  async create<T extends Prisma.EventTemplateCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventTemplateCreateArgs>
  ): Promise<EventTemplate> {
    return this.prisma.eventTemplate.create<T>(args);
  }
  async update<T extends Prisma.EventTemplateUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventTemplateUpdateArgs>
  ): Promise<EventTemplate> {
    return this.prisma.eventTemplate.update<T>(args);
  }
  async delete<T extends Prisma.EventTemplateDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventTemplateDeleteArgs>
  ): Promise<EventTemplate> {
    return this.prisma.eventTemplate.delete(args);
  }

  async findEventPictures(
    parentId: string,
    args: Prisma.EventPictureFindManyArgs
  ): Promise<EventPicture[]> {
    return this.prisma.eventTemplate
      .findUnique({
        where: { id: parentId },
      })
      .eventPictures(args);
  }

  async getTeacher(parentId: string): Promise<User | null> {
    return this.prisma.eventTemplate
      .findUnique({
        where: { id: parentId },
      })
      .teacher();
  }
}
