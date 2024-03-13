interface LoadingProps {
  height: number;
}

export default function Loading(props: LoadingProps) {
  return <div className={`bg-slate-100 animate-pulse h-[${props.height}]`} />;
}
