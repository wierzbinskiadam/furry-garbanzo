import { ArgsType, Field } from "@nestjs/graphql";
import { EventTemplateWhereInput } from "./EventTemplateWhereInput";

@ArgsType()
class EventTemplateFindManyArgs {
  @Field(() => EventTemplateWhereInput, { nullable: true })
  where?: EventTemplateWhereInput;
}

export { EventTemplateFindManyArgs };
