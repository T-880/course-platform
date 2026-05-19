import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-list',
  imports: [],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList {

  private courseService = inject(CourseService);

  courses = signal<Course[]>([]);

  constructor() {
    this.courseService.getCourses().subscribe(data => {
      this.courses.set(data);
    });
  }
}