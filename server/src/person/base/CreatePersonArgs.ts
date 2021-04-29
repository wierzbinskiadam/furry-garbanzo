import { ArgsType, Field } from "@nestjs/graphql";
import { PersonCreateInput } from "./PersonCreateInput";

@ArgsType()
class CreatePersonArgs {
  @Field(() => PersonCreateInput, { nullable: false })
  data!: PersonCreateInput;
}

export { CreatePersonArgs };
