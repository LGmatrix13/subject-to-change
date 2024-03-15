interface SelectInputProps {
  name: string;
  className?: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: {
    [name: string]: string | boolean;
  };
  children: React.ReactNode;
}

export default function SelectInput(props: SelectInputProps) {
  return (
    <div className="space-y-3 flex flex-col">
      <label htmlFor={props.name} className="font-bold">
        {props.label}
      </label>
      <select
        name={props.name}
        className={props.className}
        {...props.options}
        onChange={props.onChange}
      >
        {props.children}
      </select>
    </div>
  );
}
