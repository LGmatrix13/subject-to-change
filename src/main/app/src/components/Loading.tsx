interface LoadingProps {
  height: number;
}

export default function Loading(props: LoadingProps) {
  return (
    <div
      className={`bg-slate-100 p-7 rounded-lg custom-shadow animate-pulse duration-75	`}
      style={{
        height: props.height,
      }}
    />
  );
}
