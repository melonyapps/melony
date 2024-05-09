import { FilterItem, isValidDate } from "@melony/core";
import { Document, Filter } from "mongodb";

const getCorrectFilterValue = (val: any, replace: any) => {
	return val;
};

export const filterToQuery = (filter: FilterItem[], replaceVariables?: any) => {
	const query: Filter<Document> = {};

	filter.map((item) => {
		query[item.field] = item.value;
	});

	// filter.map((item) => {
	// 	const fieldKey = item.field.replace("#", "."); // replace # with . when we need to filter by joined table

	// 	switch (item.operator) {
	// 		case "Is":
	// 			if (item?.value?.id) {
	// 				query[`${fieldKey}.id`] = item?.value?.id;
	// 			} else {
	// 				query[fieldKey] = isValidDate(item.value)
	// 					? new Date(item.value)
	// 					: item.value;
	// 			}

	// 			break;

	// 		case "GeoWithinBox":
	// 			query[fieldKey] = {
	// 				$geoWithin: {
	// 					$box: [
	// 						[parseFloat(item.value[0][0]), parseFloat(item.value[0][1])],
	// 						[parseFloat(item.value[1][0]), parseFloat(item.value[1][1])],
	// 					],
	// 				},
	// 			};

	// 			break;

	// 		case "DoesNotContain":
	// 			if (item?.value?.id) {
	// 				query[`${fieldKey}.id`] = {
	// 					$not: new RegExp(
	// 						getCorrectFilterValue(item.value.id, replaceVariables),
	// 						"i",
	// 					),
	// 				};
	// 			} else {
	// 				query[fieldKey] = {
	// 					$not: new RegExp(
	// 						getCorrectFilterValue(item.value, replaceVariables),
	// 						"i",
	// 					),
	// 				};
	// 			}

	// 			break;

	// 		default:
	// 			// if there is a nested document reference, compare only id
	// 			if (item?.value?.id) {
	// 				query[`${fieldKey}.id`] = new RegExp(
	// 					getCorrectFilterValue(item.value.id, replaceVariables),
	// 					"i",
	// 				);
	// 			} else {
	// 				query[fieldKey] = new RegExp(
	// 					getCorrectFilterValue(item.value, replaceVariables),
	// 					"i",
	// 				);
	// 			}
	// 	}
	// });

	return query;
};
