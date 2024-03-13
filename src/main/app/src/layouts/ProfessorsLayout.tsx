interface ProfessorsLayoutProps {
  children: React.ReactNode;
}

export default function ProfessorsLayout(props: ProfessorsLayoutProps) {
  return (
    <section className="space-y-5 mb-10 animate-fade">
      <h1 className="uppercase text-3xl font-light">Professors</h1>
      {props.children}
    </section>
  );
}
