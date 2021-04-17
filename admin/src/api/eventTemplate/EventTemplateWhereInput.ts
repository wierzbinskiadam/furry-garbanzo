import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type EventTemplateWhereInput = {
  createdAt?: Date;
  description?: string;
  id?: string;
  teacher?: UserWhereUniqueInput | null;
  updatedAt?: Date;
};
