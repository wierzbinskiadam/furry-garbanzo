import { ArgsType, Field } from "@nestjs/graphql";
import { PersonWhereUniqueInput } from "./PersonWhereUniqueInput";
import { PersonUpdateInput } from "./PersonUpdateInput";

@ArgsType()
class UpdatePersonArgs {
  @Field(() => PersonWhereUniqueInput, { nullable: false })
  where!: PersonWhereUniqueInput;
  @Field(() => PersonUpdateInput, { nullable: false })
  data!: PersonUpdateInput;
}

export { UpdatePersonArgs };
