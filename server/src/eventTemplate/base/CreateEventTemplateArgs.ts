import { ArgsType, Field } from "@nestjs/graphql";
import { EventTemplateCreateInput } from "./EventTemplateCreateInput";

@ArgsType()
class CreateEventTemplateArgs {
  @Field(() => EventTemplateCreateInput, { nullable: false })
  data!: EventTemplateCreateInput;
}

export { CreateEventTemplateArgs };
