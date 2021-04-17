import { ArgsType, Field } from "@nestjs/graphql";
import { EventTemplateWhereUniqueInput } from "./EventTemplateWhereUniqueInput";

@ArgsType()
class DeleteEventTemplateArgs {
  @Field(() => EventTemplateWhereUniqueInput, { nullable: false })
  where!: EventTemplateWhereUniqueInput;
}

export { DeleteEventTemplateArgs };
