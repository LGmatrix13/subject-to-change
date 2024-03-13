interface InputProps {
  className?: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: {
    [name: string]: string | boolean;
  };
}

export default function Input(props: InputProps) {
  return (
    <div className="space-y-3 flex flex-col">
      <label htmlFor="department" className="font-bold">
        {props.label}
      </label>
      <input
        {...props.options}
        onChange={props.onChange}
        className={props.className || "p-3 bg-slate-200 rounded-lg w-full"}
      />
    </div>
  );
}
