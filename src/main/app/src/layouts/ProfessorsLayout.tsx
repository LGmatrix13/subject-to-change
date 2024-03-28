import containerBackground from "/containerBackground.png";

interface ProfessorsLayoutProps {
  children: React.ReactNode;
}

export default function ProfessorsLayout(props: ProfessorsLayoutProps) {
  return (
    <section className="space-y-5 mb-10">
      <h1 className="uppercase text-3xl font-light">Professors</h1>
      <div
        className="bg-slate-200 rounded-lg animate-fade shadow-inner p-7"
        style={{
          backgroundImage: `url(${containerBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {props.children}
      </div>
    </section>
  );
}
