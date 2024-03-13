interface CoursesLayoutProps {
  children: React.ReactNode;
}

export default function CoursesLayout(props: CoursesLayoutProps) {
  return (
    <section className="space-y-7 mb-10 animate-fade">
      <h1 className="uppercase text-3xl font-light">Courses</h1>
      {props.children}
    </section>
  );
}
