import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private courseService = inject(CourseService);

  courses = signal<Course[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
        this.loading.set(false);
      }
    });
  }

  totalCourses = () => this.courses().length;

  totalSubjects = () => {
    const subjects = this.courses().map(c => c.subject);
    return new Set(subjects).size;
  };
}