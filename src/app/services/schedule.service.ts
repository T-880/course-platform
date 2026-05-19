import { Injectable, signal, computed } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private _schedule = signal<Course[]>([]);

  schedule = this._schedule.asReadonly();

  addCourse(course: Course) {

    const exists = this._schedule().some(
      c => c.courseCode === course.courseCode
    );

    if (exists) return;

    this._schedule.update(list => [...list, course]);
  }

  removeCourse(courseCode: string) {
    this._schedule.update(list =>
      list.filter(c => c.courseCode !== courseCode)
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
}
