import { Course } from "./types";

export class Search {
  static run(courses: Course[], searchParams: URLSearchParams): Course[] {
    const f1 = this.byName(courses, searchParams.get("name") || undefined);
    return f1;
  }
  static byName(courses: Course[], name?: string) {
    if (name) {
      const filteredCourses = [];
      for (const course of courses) {
        if (course.name.toLowerCase() === name.toLowerCase()) {
          filteredCourses.push(course);
        }
      }
      return filteredCourses;
    }

    return courses;
  }
  static byDepartment(courses: Course[], department?: string) {
    if (department) {
      const filteredCourses = [];
      for (const course of courses) {
        if (course.department === department) {
          filteredCourses.push(course);
        }
      }
    }

    return courses;
  }
  static byNumber(courses: Course[], number?: number) {
    if (number) {
      const filteredCourses = [];
      for (const course of courses) {
        if (course.number == number) {
          filteredCourses.push(course);
        }
      }
    }

    return courses;
  }
  static byProffesor(courses: Course[], professorFN?: string) {
    if (professorFN) {
      const filteredCourses = [];
      for (const course of courses) {
        if (
          course.professorFirstName
            .toLowerCase()
            .includes(professorFN.toLowerCase())
        ) {
          filteredCourses.push(course);
        }
      }
    }

    return courses;
  }
  static byWeekday(courses: Course[], weekday?: string) {
    if (weekday) {
      const filteredCourses = [];
      for (const course of courses) {
        if (course.weekday === weekday) {
          filteredCourses.push(course);
        }
      }
      return filteredCourses;
    }
    return courses;
  }
  static byStartTime(courses: Course[], startTime?: string) {
    if (startTime) {
      const filteredCourses = [];
      const startTimeDate = new Date(startTime);
      for (const course of courses) {
        const courseStartTimeDate = new Date(course.startTime || "");
        if (courseStartTimeDate >= startTimeDate) {
          filteredCourses.push(course);
        }
      }
      return filteredCourses;
    }

    return courses;
  }
  static byEndTime(courses: Course[], endTime?: string) {
    if (endTime) {
      const filteredCourses = [];
      const endTimeDate = new Date(endTime);
      for (const course of courses) {
        const courseEndTimeDate = new Date(course.endTime || "");
        if (courseEndTimeDate <= endTimeDate) {
          filteredCourses.push(course);
        }
      }
      return filteredCourses;
    }

    return courses;
  }
}
