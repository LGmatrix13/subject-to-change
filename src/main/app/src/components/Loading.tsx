import { TimeIcon } from "./Icons";

interface LoadingProps {
  title: string;
}

export default function Loading(props: LoadingProps) {
  return (
    <div className="h-[500px] flex items-center justify-center">
      <div className="flex items-center space-x-3 animate-bounce">
        <TimeIcon />
        <p>{props.title}</p>
      </div>
    </div>
  );
}
