import { SortOrder } from "../../util/SortOrder";

export type BookOrderByInput = {
  author?: SortOrder;
  createdAt?: SortOrder;
  id?: SortOrder;
  personId?: SortOrder;
  titile?: SortOrder;
  updatedAt?: SortOrder;
};
