import containerBackground from "/containerBackground.png";

interface ProgressLayoutProps {
  children: React.ReactNode;
}

export default function ProfessorsLayout(props: ProgressLayoutProps) {
  return (
    <section className="space-y-5 mb-10">
      <h1 className="uppercase text-3xl font-light">Progress</h1>
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
