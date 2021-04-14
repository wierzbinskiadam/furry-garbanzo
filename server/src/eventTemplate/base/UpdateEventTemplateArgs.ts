import { ArgsType, Field } from "@nestjs/graphql";
import { EventTemplateWhereUniqueInput } from "./EventTemplateWhereUniqueInput";
import { EventTemplateUpdateInput } from "./EventTemplateUpdateInput";

@ArgsType()
class UpdateEventTemplateArgs {
  @Field(() => EventTemplateWhereUniqueInput, { nullable: false })
  where!: EventTemplateWhereUniqueInput;
  @Field(() => EventTemplateUpdateInput, { nullable: false })
  data!: EventTemplateUpdateInput;
}

export { UpdateEventTemplateArgs };
