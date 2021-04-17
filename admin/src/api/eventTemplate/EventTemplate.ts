import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type EventTemplate = {
  createdAt: Date;
  description: string;
  id: string;
  teacher?: UserWhereUniqueInput | null;
  updatedAt: Date;
};
