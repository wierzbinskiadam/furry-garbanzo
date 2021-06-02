import { Book as TBook } from "../api/book/Book";

export const BOOK_TITLE_FIELD = "author";

export const BookTitle = (record: TBook) => {
  return record.author;
};
