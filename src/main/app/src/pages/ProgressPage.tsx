import CourseTable from "../components/CourseTable";
import Loading from "../components/Loading";
import CareerProgress from "../components/ProgressSheet";
import ProgressSheet from "../components/ProgressSheet";
import { useDelay } from "../hooks/useDelay";
import useProgress from "../hooks/useProgress";

export default function ProgressPage() {
  const delay = useDelay();
  
  

  return (
    <CareerProgress>
      <div className="space-y-3">
        <h3 className="text-x3 font-bold">Progress</h3>
        
      </div>
    </CareerProgress>
  );
}