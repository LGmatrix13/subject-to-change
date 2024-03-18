interface WideButtonProps {
  children: React.ReactNode;
  options?: {
    [name: string]: string | boolean;
  };
  onClick?: () => void;
}

export default function WideButton(props: WideButtonProps) {
  return (
    <button
      className="bg-blue-600 text-white p-3 w-full rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
      {...props?.options}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
