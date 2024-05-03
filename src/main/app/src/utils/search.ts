import { Course } from "./types";

export class Search {
  static run(courses: Course[], searchParams: URLSearchParams): Course[] {
    const f1 = this.byName(courses, searchParams.get("name") || "");
    const f2 =  this.byDepartment(f1, searchParams.get("department") || "");
    const f3 =  this.byNumber(f2, searchParams.get("number") || "");
    const f4 =  this.byProffesor(f3, searchParams.get("professor") || "");
    const f5 =  this.byWeekday(f4, searchParams.get("weekday") || "");
    const f6 =  this.byStartTime(f5, searchParams.get("startTime") || "");
    const f7 =  this.byEndTime(f6, searchParams.get("endTime") || "");
    const f8 =  this.byOrderBy(f7, searchParams.get("orderBy") || "");
    return f8;

  }
  static byName(courses: Course[], name: string) {
    if (name != "") {
    console.log("ran");
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
    if (department != "") {
      const filteredCourses = [];
      for (const course of courses) {
        if (course.department === department) {
          filteredCourses.push(course);
        }
      }
      return filteredCourses;
    }

    return courses;
  }
  static byNumber(courses: Course[], number: string) {
    if (number != "") {
        const asNum = parseInt(number);
      const filteredCourses = [];
      for (const course of courses) {
        if (course.number == asNum) {
          filteredCourses.push(course);
        }
      }
      return filteredCourses;
    }

    return courses;
  }
  static byProffesor(courses: Course[], professorFN: string) {
    if (professorFN != "") {
      const filteredCourses = [];
      for (const course of courses) {
        if (
          `${course.professorFirstName} ${course.professorLastName}`
            .toLowerCase()
            .includes(professorFN.toLowerCase())
        ) {
          filteredCourses.push(course);
        }
      }
      return filteredCourses;
    }

    return courses;
  }
  static byWeekday(courses: Course[], weekday?: string) {
    if (weekday != "") {
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
  static byStartTime(courses: Course[], startTime: string) {
    if (startTime != "") {
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
  static byEndTime(courses: Course[], endTime: string) {
    if (endTime != "") {
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

  static byOrderBy(courses: Course[], orderBy?: string)
  {
    if (orderBy !="") {
        if(orderBy === "desc"){
            courses = courses.sort((a, b) => (a.enrolled > b.enrolled) ? 1 : -1)
        }
        if(orderBy === "asc"){
            courses = courses.sort((a, b) => (a.enrolled < b.enrolled) ? 1 : -1)
        }
      }
  
      return courses;
  }
}
