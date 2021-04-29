import { ArgsType, Field } from "@nestjs/graphql";
import { BookWhereInput } from "./BookWhereInput";

@ArgsType()
class BookFindManyArgs {
  @Field(() => BookWhereInput, { nullable: true })
  where?: BookWhereInput;
}

export { BookFindManyArgs };
