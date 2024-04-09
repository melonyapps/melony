import { FilterItem } from ".";
import { isValidDate } from "../utils";

const getCorrectFilterValue = (value: any, replaceVariables: any = {}) => {
  if (value === "true") return true;
  if (value === "false") return false;

  if (value === "{currentDocId}") {
    value = replaceVariables["currentDocId"];
  }

  if (value === "{currentUserId}") {
    value = replaceVariables["currentUserId"];
  }
  if (value === "{currentUserEmail}") {
    value = replaceVariables["currentUserEmail"];
  }

  return value;
};

export const filterToQuery = (filter: FilterItem[], replaceVariables?: any) => {
  const query: Record<string, any> = {};

  filter.map((item) => {
    const fieldKey = item.field.replace("#", "."); // replace # with . when we need to filter by joined table

    switch (item.operator) {
      case "is":
        if (item?.value?.id) {
          query[`${fieldKey}.id`] = item?.value?.id;
        } else {
          query[fieldKey] = isValidDate(item.value)
            ? new Date(item.value)
            : item.value;
        }

        break;

      case "geo within box":
        query[fieldKey] = {
          $geoWithin: {
            $box: [
              [parseFloat(item.value[0][0]), parseFloat(item.value[0][1])],
              [parseFloat(item.value[1][0]), parseFloat(item.value[1][1])],
            ],
          },
        };

        break;

      case "does not contain":
        if (item?.value?.id) {
          query[`${fieldKey}.id`] = {
            $not: new RegExp(
              getCorrectFilterValue(item.value.id, replaceVariables),
              "i"
            ),
          };
        } else {
          query[fieldKey] = {
            $not: new RegExp(
              getCorrectFilterValue(item.value, replaceVariables),
              "i"
            ),
          };
        }

        break;

      default:
        // if there is a nested document reference, compare only id
        if (item?.value?.id) {
          query[`${fieldKey}.id`] = new RegExp(
            getCorrectFilterValue(item.value.id, replaceVariables),
            "i"
          );
        } else {
          query[fieldKey] = new RegExp(
            getCorrectFilterValue(item.value, replaceVariables),
            "i"
          );
        }
    }
  });

  return query;
};
