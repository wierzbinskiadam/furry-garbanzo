import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { PersonWhereInput } from "./PersonWhereInput";
import { Type } from "class-transformer";
import { PersonOrderByInput } from "./PersonOrderByInput";

@ArgsType()
class PersonFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => PersonWhereInput,
  })
  @Field(() => PersonWhereInput, { nullable: true })
  @Type(() => PersonWhereInput)
  where?: PersonWhereInput;

  @ApiProperty({
    required: false,
    type: PersonOrderByInput,
  })
  @Field(() => PersonOrderByInput, { nullable: true })
  @Type(() => PersonOrderByInput)
  orderBy?: PersonOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { PersonFindManyArgs };
