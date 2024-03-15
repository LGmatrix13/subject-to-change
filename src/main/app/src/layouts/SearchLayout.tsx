interface CoursesLayoutProps {
  children: React.ReactNode;
}

export default function SearchLayout(props: CoursesLayoutProps) {
  return (
    <section className="space-y-7 mb-10 animate-fade">
      <h1 className="uppercase text-3xl font-light">Search</h1>
      {props.children}
    </section>
  );
}
