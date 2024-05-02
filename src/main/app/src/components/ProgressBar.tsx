interface ProgressBarProps {
  total: number;
  taken: number;
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div
      className="bg-blue-600 h-7 rounded-full flex items-center animate-bar"
      style={{
        width: `${
          props.taken > 0 ? Math.max(props.taken / props.total) * 100 : 5
        } %`,
      }}
    />
  );
}
