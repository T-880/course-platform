import { Component, inject, signal, computed } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-course-list',
  imports: [],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {

  private courseService = inject(CourseService);
  private scheduleService = inject(ScheduleService);
  courses = toSignal(this.courseService.getCourses(), {
    initialValue: []
  });

  searchTerm = signal('');
  subjectFilter = signal('all');
  sortKey = signal<'courseCode' | 'courseName' | 'points' | 'subject'>('courseCode');
  sortDirection = signal<'asc' | 'desc'>('asc');
  currentPage = signal(1);

  itemsPerPage = 12;

  subjects = computed(() => {
    const list = this.courses();
    return [...new Set(list.map(c => c.subject))];
  });

  sortedCourses = computed(() => {

    const term = this.searchTerm().toLowerCase();
    const subject = this.subjectFilter();

    const key = this.sortKey();
    const direction = this.sortDirection();

    let result = this.courses().filter(course => {

      const matchesSearch =
        course.courseName.toLowerCase().includes(term) ||
        course.courseCode.toLowerCase().includes(term);

      const matchesSubject =
        subject === 'all' || course.subject === subject;

      return matchesSearch && matchesSubject;
    });

    result = result.sort((a: any, b: any) => {

      let valueA = a[key];
      let valueB = b[key];

      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  });

  totalPages = computed(() => {
  return Math.ceil(
    this.sortedCourses().length / this.itemsPerPage
  );
});

paginatedCourses = computed(() => {

  const start =
    (this.currentPage() - 1) * this.itemsPerPage;

  const end = start + this.itemsPerPage;

  return this.sortedCourses().slice(start, end);

});

  addToSchedule(course: any) {
    this.scheduleService.addCourse(course);
  }

  removeFromSchedule(courseCode: string) {
    this.scheduleService.removeCourse(courseCode);
  }

  isAdded(courseCode: string): boolean {
 
    return this.scheduleService.schedule()
      .some(course => course.courseCode === courseCode);
  }

nextPage() {

  if (this.currentPage() < this.totalPages()) {

    this.currentPage.update(page => page + 1);

  }

}

previousPage() {

  if (this.currentPage() > 1) {

    this.currentPage.update(page => page - 1);

  }

}

}