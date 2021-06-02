import { SortOrder } from "../../util/SortOrder";

export type PersonOrderByInput = {
  birthday?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  surname?: SortOrder;
  updatedAt?: SortOrder;
};
