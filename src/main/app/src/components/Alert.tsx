interface AlertProps {
  title: string;
  message: string;
  children: React.ReactNode;
}

export default function Alert(props: AlertProps) {
  return (
    <div className="flex flex-col space-y-5 p-7 bg-slate-100 rounded-lg custom-shadow w-full">
      <h2 className="font-bold uppercase text-2xl">{props.title}</h2>
      <p>{props.message}</p>
      {props.children}
    </div>
  );
}
