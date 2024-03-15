interface OptionProps {
  label: string;
  value: string;
}

export function Option(props: OptionProps) {
  return <option value={props.value}>{props.label}</option>;
}
