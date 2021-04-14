import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type EventTemplateCreateInput = {
  description: string;
  teacher?: UserWhereUniqueInput | null;
};
