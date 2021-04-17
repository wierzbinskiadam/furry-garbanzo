import { PrismaService } from "nestjs-prisma";
import { Prisma, EventPicture, EventTemplate } from "@prisma/client";

export class EventPictureServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends Prisma.EventPictureFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventPictureFindManyArgs>
  ): Promise<EventPicture[]> {
    return this.prisma.eventPicture.findMany(args);
  }
  async findOne<T extends Prisma.EventPictureFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventPictureFindUniqueArgs>
  ): Promise<EventPicture | null> {
    return this.prisma.eventPicture.findUnique(args);
  }
  async create<T extends Prisma.EventPictureCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventPictureCreateArgs>
  ): Promise<EventPicture> {
    return this.prisma.eventPicture.create<T>(args);
  }
  async update<T extends Prisma.EventPictureUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventPictureUpdateArgs>
  ): Promise<EventPicture> {
    return this.prisma.eventPicture.update<T>(args);
  }
  async delete<T extends Prisma.EventPictureDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.EventPictureDeleteArgs>
  ): Promise<EventPicture> {
    return this.prisma.eventPicture.delete(args);
  }

  async findEventTemplateId(
    parentId: string,
    args: Prisma.EventTemplateFindManyArgs
  ): Promise<EventTemplate[]> {
    return this.prisma.eventPicture
      .findUnique({
        where: { id: parentId },
      })
      .eventTemplateId(args);
  }
}
