interface SelectProps {
  name: string;
  className?: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: {
    [name: string]: string | boolean;
  };
  children: React.ReactNode;
}

export default function Select(props: SelectProps) {
  return (
    <div className="space-y-3 flex flex-col">
      <label htmlFor={props.name} className="font-bold">
        {props.label}
      </label>
      <select
        name={props.name}
        className={
          props.className ||
          "p-3 bg-slate-200 rounded-lg w-full box-border h-[52px]"
        }
        {...props.options}
        onChange={props.onChange}
      >
        <option value="" disabled selected />
        {props.children}
      </select>
    </div>
  );
}
