import { FormInput } from "./components/form/form-input";
import { FieldText } from "./components/fields/field-text";
import { FieldDocument } from "./components/fields/field-document";
import { FormCombobox } from "./components/form/form-combobox";
import { FieldCurrency } from "./components/fields/field-currency";
import { FieldPassword } from "./components/fields/field-password";
import { FormPassword } from "./components/form/form-password";
import { FieldColor } from "./components/fields/field-color";
import { FormColor } from "./components/form/form-color";
import { FieldCheckbox } from "./components/fields/field-checkbox";
import { FormCheckbox } from "./components/form/form-checkbox";
import { FieldNumber } from "./components/fields/field-number";
import { FormNumber } from "./components/form/form-number";
import { FieldDate } from "./components/fields/field-date";
import { FormDate } from "./components/form/form-date";
import { FieldImage } from "./components/fields/field-image";
import { FormImage } from "./components/form/form-image";

export const FIELDS: Record<
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
