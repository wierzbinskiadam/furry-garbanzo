import { ArgsType, Field } from "@nestjs/graphql";
import { PersonWhereUniqueInput } from "./PersonWhereUniqueInput";

@ArgsType()
class DeletePersonArgs {
  @Field(() => PersonWhereUniqueInput, { nullable: false })
  where!: PersonWhereUniqueInput;
}

export { DeletePersonArgs };
