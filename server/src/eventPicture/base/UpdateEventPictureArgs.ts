import { ArgsType, Field } from "@nestjs/graphql";
import { EventPictureWhereUniqueInput } from "./EventPictureWhereUniqueInput";
import { EventPictureUpdateInput } from "./EventPictureUpdateInput";

@ArgsType()
class UpdateEventPictureArgs {
  @Field(() => EventPictureWhereUniqueInput, { nullable: false })
  where!: EventPictureWhereUniqueInput;
  @Field(() => EventPictureUpdateInput, { nullable: false })
  data!: EventPictureUpdateInput;
}

export { UpdateEventPictureArgs };
