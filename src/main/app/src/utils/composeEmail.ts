import type { Course } from "./types";

export default function composeEmail(course: Course): string {
  const to = `${course.professor.firstName} ${course.professor.lastName}`;
  const subject = `${course.department} ${course.number} Sign-In Request`;
  const body = `Dear Dr. ${course.professor.lastName}`;
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
