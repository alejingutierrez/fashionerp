import FormLabel, { FormLabelProps } from '@mui/material/FormLabel';

export type LabelProps = FormLabelProps;

/**
 * Etiqueta para campos de formulario basada en MUI `FormLabel`.
 */
export function Label(props: LabelProps) {
  return <FormLabel {...props} />;
}

export default Label;
