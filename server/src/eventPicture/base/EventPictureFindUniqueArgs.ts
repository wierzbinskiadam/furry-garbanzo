import { ArgsType, Field } from "@nestjs/graphql";
import { EventPictureWhereUniqueInput } from "./EventPictureWhereUniqueInput";

@ArgsType()
class EventPictureFindUniqueArgs {
  @Field(() => EventPictureWhereUniqueInput, { nullable: false })
  where!: EventPictureWhereUniqueInput;
}

export { EventPictureFindUniqueArgs };
