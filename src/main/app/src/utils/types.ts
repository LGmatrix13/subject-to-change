export interface Course {
  semester: "fall" | "spring";
  department: string;
  number: number;
  year: number;
  name: string;
  startTime?: string;
  endTime?: string;
  hours: number;
  weekday: string;
  seats: number;
  enrolled: number;
  professorFirstName: string;
  professorLastName: string;
}

export interface Event {
  name: string;
  startTime?: string;
  number?: number;
  endTime?: string;
  weekday: string;
}

export interface Professor {
  department: string;
  firstName: string;
  lastName: string;
}

export interface Student {
  student: Event;
  courses: Course[];
  events: Event[];
}
