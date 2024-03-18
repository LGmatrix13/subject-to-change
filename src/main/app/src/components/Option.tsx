interface OptionProps {
  label: string;
  value: string;
  selected?: boolean;
}

export function Option(props: OptionProps) {
  return (
    <option value={props.value} selected={props.selected}>
      {props.label}
    </option>
  );
}
