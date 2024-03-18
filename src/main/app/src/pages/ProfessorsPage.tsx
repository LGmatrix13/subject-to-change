import React from "react";
import ProfessorCard from "../components/ProfessorCard";
// import { useSelector } from "react-redux";

export default function ProfessorsPage() {
//   const fallSchedule = useSelector((state) => state.student.fallSchedule);
//   const springSchedule = useSelector((state) => state.student.springSchedule);
//
//   const allCourses = [...fallSchedule.courses, ...springSchedule.courses];
//
//   const professorCards = allCourses.map((course, index) => (
//     <ProfessorCard
//       key={index}
//       firstName={course.professor.firstName}
//       lastName={course.professor.lastName}
//       department={course.professor.department}
//     />
//   ));

  return (
//     <div className="grid grid-cols-3 gap-5">
//       {professorCards.length > 0 ? (
//         professorCards
//       ) : (
//         <p>Schedule Courses to View Your Professors!</p>
//       )}
//     </div>
    <div className="grid grid-cols-3 gap-5">
          <ProfessorCard
            firstName="Test"
            lastName="Test"
            department="Computer Science"
          />
          <ProfessorCard
            firstName="Test"
            lastName="Test"
            department="Computer Science"
          />
          <ProfessorCard
            firstName="Test"
            lastName="Test"
            department="Computer Science"
          />
          <ProfessorCard
            firstName="Test"
            lastName="Test"
            department="Computer Science"
          />
          <ProfessorCard
            firstName="Test"
            lastName="Test"
            department="Computer Science"
          />
        </div>
  );
}