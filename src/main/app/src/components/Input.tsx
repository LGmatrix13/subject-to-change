interface InputProps {
  name: string;
  className?: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options?: {
    [name: string]: string | boolean;
  };
}

export default function Input(props: InputProps) {
  return (
    <div className="space-y-3 flex flex-col">
      <label htmlFor={props.name} className="font-bold">
        {props.label}
      </label>
      <input
        name={props.name}
        {...props.options}
        onChange={props.onChange}
        className={
          props.className || "p-3 bg-slate-200 rounded-lg w-full h-[52px]"
        }
      />
    </div>
  );
}
