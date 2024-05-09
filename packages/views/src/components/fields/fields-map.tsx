import { FieldCheckbox } from "./checkbox/field-checkbox";
import { FormCheckbox } from "./checkbox/form-checkbox";
import { FieldColor } from "./color/field-color";
import { FormColor } from "./color/form-color";
import { FieldCurrency } from "./currency/field-currency";
import { FieldDate } from "./date/field-date";
import { FormDate } from "./date/form-date";
import { FieldDocument } from "./document/field-document";
import { FormCombobox } from "./document/form-combobox";
import { FieldImage } from "./image/field-image";
import { FormImage } from "./image/form-image";
import { FieldNumber } from "./number/field-number";
import { FormNumber } from "./number/form-number";
import { FieldPassword } from "./password/field-password";
import { FormPassword } from "./password/form-password";
import { FieldText } from "./text/field-text";
import { FormInput } from "./text/form-input";

export const FIELDS_MAP: Record<
	any,
	{ default: (props: any) => JSX.Element; form: (props: any) => JSX.Element }
> = {
	TEXT: {
		default: FieldText,
		form: FormInput,
	},
	NUMBER: {
		default: FieldNumber,
		form: FormNumber,
	},
	CURRENCY: {
		default: FieldCurrency,
		form: FormNumber,
	},
	DOCUMENT: {
		default: FieldDocument,
		form: FormCombobox,
	},
	PASSWORD: {
		default: FieldPassword,
		form: FormPassword,
	},
	COLOR: {
		default: FieldColor,
		form: FormColor,
	},
	CHECKBOX: {
		default: FieldCheckbox,
		form: FormCheckbox,
	},
	DATE: {
		default: FieldDate,
		form: FormDate,
	},
	IMAGE: {
		default: FieldImage,
		form: FormImage,
	},
};
