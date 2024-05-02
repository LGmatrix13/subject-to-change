
import CareerProgress from "../components/CareerProgress";
import { useDelay } from "../hooks/useDelay";
import useProgress from "../hooks/useProgress";

export default function ProgressPage() {
  const delay = useDelay();

  return (
    <CareerProgress>
      <div className="space-y-3">
        <div><h2 className="text-2xl font-bold">REQUIREMENTS</h2></div>
        <div><h3 className="text-xl font-bold">Humanities Core</h3>
          <p>Completed 5/5</p>
        </div>
        <div><h4 className="text-xl font-bold">Studies in Science, Faith, and Technology</h4></div>
        <div><h5 className="text-xl font-bold">Writing Requirement</h5></div>
        <div> <h6 className="text-xl font-bold">Foundations of the Social Sciences</h6></div>

      </div>
    </CareerProgress>
  );
}
