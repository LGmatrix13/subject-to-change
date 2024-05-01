import { Course } from "./types";

class Search {
    static byName(courses: Course[], name: string) {
        const filteredCourses = []
        for (const course of courses) {
            if (course.name.toLowerCase() === name.toLowerCase()) {
                filteredCourses.push(course)
            }
        }
        return filteredCourses;
    }
    static byDepartment(courses: Course[], department: string) {
        const filteredCourses = []
        for (const course of courses) {
            if (course.department === department) {
                filteredCourses.push(course)
            }
        }
        return filteredCourses;
    } 
    static byNumber(courses: Course[], number: number) {
        const filteredCourses = []
        for (const course of courses) {
            if (course.number == number) {
                filteredCourses.push(course)
            }
        }
        return filteredCourses;
    } 
    static byProffesor(courses: Course[], professorFN: string, proffesorLN: string) {
        const filteredCourses = []
        for (const course of courses) {
            if (course.professorFirstName === professorFN && course.professorLastName === proffesorLN) {
                filteredCourses.push(course)
            }
        }
        return filteredCourses;
    } 
    static byWeekday(courses: Course[], weekday: string) {
        const filteredCourses = []
        for (const course of courses) {
            if (course.weekday === weekday) {
                filteredCourses.push(course)
            }
        }
        return filteredCourses;
    } 
    static byStartTime(courses: Course[], startTime: string) {
        const filteredCourses = []
        const startTimeDate = new Date(startTime);
        for (const course of courses) {
            const courseStartTimeDate = new Date(course.startTime || "")
            if (courseStartTimeDate >= startTimeDate) {
                filteredCourses.push(course)
            }
        }
        return filteredCourses;
    } 
    static byEndTime(courses: Course[], endTime: string) {
        const filteredCourses = []
        const endTimeDate = new Date(endTime);
        for (const course of courses) {
            const courseEndTimeDate = new Date(course.endTime || "")
            if (courseEndTimeDate <= endTimeDate) {
                filteredCourses.push(course)
            }
        }
        return filteredCourses;
    } 
    
}