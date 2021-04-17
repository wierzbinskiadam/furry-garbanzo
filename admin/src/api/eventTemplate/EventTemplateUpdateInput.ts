import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type EventTemplateUpdateInput = {
  description?: string;
  teacher?: UserWhereUniqueInput | null;
};
