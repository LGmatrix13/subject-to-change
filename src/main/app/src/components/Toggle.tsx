interface ToggleProps {
  onClick: () => void;
  checked: boolean;
  label: string;
}

export default function Toggle(props: ToggleProps) {
  return (
    <div
      className="inline-flex items-center cursor-pointer"
      onClick={props.onClick}
    >
      <input
        type="checkbox"
        name="toggle"
        className="sr-only peer"
        checked={props.checked}
      />
      <div className="relative w-11 h-6 bg-slate-200 rounded-full peer peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white  after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
      <label htmlFor="toggle" className="ms-3 font-bold">
        {props.label}
      </label>
    </div>
  );
}
