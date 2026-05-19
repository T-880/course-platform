import { Component, inject, signal, computed } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-course-list',
  imports: [],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {

  private courseService = inject(CourseService);

  courses = toSignal(this.courseService.getCourses(), {
    initialValue: []
  });

  searchTerm = signal('');
  subjectFilter = signal('all');

  subjects = computed(() => {
    const list = this.courses();
    return [...new Set(list.map(c => c.subject))];
  });

  filteredCourses = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const subject = this.subjectFilter();

    return this.courses().filter(course => {

      const matchesSearch =
        course.courseName.toLowerCase().includes(term) ||
        course.courseCode.toLowerCase().includes(term);

      const matchesSubject =
        subject === 'all' || course.subject === subject;

      return matchesSearch && matchesSubject;
    });
  });
}