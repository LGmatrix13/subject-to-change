import type { Course } from "./types";

export default function composeEmail(course: Course): string {
  const to = `${course.professorFirstName} ${course.professorLastName}`;
  const subject = `${course.department} ${course.number} Sign-In Request`;
  const body = `Dear Dr. ${course.professorFirstName}`;
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
