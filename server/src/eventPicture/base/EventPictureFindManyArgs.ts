import { ArgsType, Field } from "@nestjs/graphql";
import { EventPictureWhereInput } from "./EventPictureWhereInput";

@ArgsType()
class EventPictureFindManyArgs {
  @Field(() => EventPictureWhereInput, { nullable: true })
  where?: EventPictureWhereInput;
}

export { EventPictureFindManyArgs };
