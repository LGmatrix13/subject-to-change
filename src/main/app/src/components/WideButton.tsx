interface WideButtonProps {
  children: React.ReactNode;
  options?: {
    [name: string]: string | boolean;
  };
}

export default function WideButton(props: WideButtonProps) {
  return (
    <button
      className="bg-blue-600 text-white p-3 w-full rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
      {...props?.options}
    >
      {props.children}
    </button>
  );
}
