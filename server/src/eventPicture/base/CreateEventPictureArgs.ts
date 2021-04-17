import { ArgsType, Field } from "@nestjs/graphql";
import { EventPictureCreateInput } from "./EventPictureCreateInput";

@ArgsType()
class CreateEventPictureArgs {
  @Field(() => EventPictureCreateInput, { nullable: false })
  data!: EventPictureCreateInput;
}

export { CreateEventPictureArgs };
