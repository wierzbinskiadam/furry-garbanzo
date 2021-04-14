import { ArgsType, Field } from "@nestjs/graphql";
import { EventTemplateWhereUniqueInput } from "./EventTemplateWhereUniqueInput";

@ArgsType()
class EventTemplateFindUniqueArgs {
  @Field(() => EventTemplateWhereUniqueInput, { nullable: false })
  where!: EventTemplateWhereUniqueInput;
}

export { EventTemplateFindUniqueArgs };
