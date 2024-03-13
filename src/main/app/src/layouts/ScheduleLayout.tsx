interface ScheduleLayoutProps {
  children: React.ReactNode;
}

export default function ScheduleLayout(props: ScheduleLayoutProps) {
  return (
    <section className="space-y-5 mb-10 animate-fade">
      <h1 className="uppercase text-3xl font-light">Schedule</h1>
      {props.children}
    </section>
  );
}
