import { Injectable, signal, computed, effect } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private _schedule = signal<Course[]>(this.loadFromLocalStorage());

  schedule = this._schedule.asReadonly();

    addCourse(course: Course) {

    const exists = this._schedule().some(
      c => c.courseCode === course.courseCode
    );

    if (!exists) {
      this._schedule.update(courses => [...courses, course]);
    }
  }

  removeCourse(courseCode: string) {
    this._schedule.update(courses =>
      courses.filter(course => course.courseCode !== courseCode)
    );
  }
  totalPoints = computed(() => {
    return this._schedule().reduce((sum, course) => {
      return sum + course.points;
    }, 0);
  });

  totalCourses = computed(() => {
    return this._schedule().length;
  });

  constructor() {

    effect(() => {
      localStorage.setItem(
        'schedule',
        JSON.stringify(this._schedule())
      );
    });
  }

  private loadFromLocalStorage(): Course[] {

    const data = localStorage.getItem('schedule');

    return data ? JSON.parse(data) : [];
  }
}