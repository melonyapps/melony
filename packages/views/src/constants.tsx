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

export const FIELDS: Record<
	any,
	{ default: (props: any) => JSX.Element; form: (props: any) => JSX.Element }
> = {
	TEXT: {
		default: FieldText,
		form: FormInput,
	},
	CURRENCY: {
		default: FieldCurrency,
		form: FormInput,
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
};
