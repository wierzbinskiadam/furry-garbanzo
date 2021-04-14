import { ArgsType, Field } from "@nestjs/graphql";
import { EventPictureWhereUniqueInput } from "./EventPictureWhereUniqueInput";

@ArgsType()
class DeleteEventPictureArgs {
  @Field(() => EventPictureWhereUniqueInput, { nullable: false })
  where!: EventPictureWhereUniqueInput;
}

export { DeleteEventPictureArgs };
