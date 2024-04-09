import { FormInput } from "./components/form/form-input";
import { FieldText } from "./components/fields/field-text";
import { FieldDocument } from "./components/fields/field-document";
import { FormCombobox } from "./components/form/form-combobox";
import { FieldCurrency } from "./components/fields/field-currency";

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
};
