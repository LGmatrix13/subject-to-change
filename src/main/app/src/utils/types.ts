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
  semester: "fall" | "spring";
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
  roomNumber: int;
  officeHours: string;
  bio: string;
  rating: double;
  difficulty: double;
  numRatings: int;
}

export interface Student {
  student: Event;
  courses: Course[];
  events: Event[];
}
