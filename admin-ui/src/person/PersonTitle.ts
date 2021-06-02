import { Person as TPerson } from "../api/person/Person";

export const PERSON_TITLE_FIELD = "surname";

export const PersonTitle = (record: TPerson) => {
  return record.surname;
};
