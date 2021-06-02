import { PrismaService } from "nestjs-prisma";
import { Prisma, Book } from "@prisma/client";

export class BookServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.BookFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BookFindManyArgs>
  ): Promise<number> {
    return this.prisma.book.count(args);
  }

  async findMany<T extends Prisma.BookFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.BookFindManyArgs>
  ): Promise<Book[]> {
    return this.prisma.book.findMany(args);
  }
  async findOne<T extends Prisma.BookFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.BookFindUniqueArgs>
  ): Promise<Book | null> {
    return this.prisma.book.findUnique(args);
  }
  async create<T extends Prisma.BookCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BookCreateArgs>
  ): Promise<Book> {
    return this.prisma.book.create<T>(args);
  }
  async update<T extends Prisma.BookUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.BookUpdateArgs>
  ): Promise<Book> {
    return this.prisma.book.update<T>(args);
  }
  async delete<T extends Prisma.BookDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.BookDeleteArgs>
  ): Promise<Book> {
    return this.prisma.book.delete(args);
  }
}
