interface ProfessorsLayoutProps {
  children: React.ReactNode;
}

export default function ProfessorsLayout(props: ProfessorsLayoutProps) {
  return (
    <section className="space-y-5 mb-10 animate-fade">
        <h1 className="uppercase text-3xl font-light">Professors</h1>
        <div className={'relative overflow-hidden bg-slate-100 rounded-lg shadow-inset-slate800-from-top-right'}>
            <div className="relative p-6">{props.children}</div>
        </div>
    </section>
  );
}
