export interface Course {
  semester: "FALL" | "SPRING";
  department: string;
  number: number;
  year: number;
  name: string;
  startTime: string;
  endTime: string;
  hours: number;
  weekday: string;
  seats: number;
  enrolled: number;
  professor: Professor;
  waitlist: Student[];
}

export interface Professor {
  department: string;
  firstName: string;
  lastName: string;
}

export interface Student {
  id: string;
  major: string;
  firstName: string;
  lastName: string;
  year: number;
  fallSchedule: Course[];
  springSchedule: Course[];
}
