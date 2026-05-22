import { Component, inject, signal, computed, effect } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.html',
  styleUrl: './schedule.css'
})
export class Schedule {

  private scheduleService = inject(ScheduleService);

  courses = this.scheduleService.schedule;
  totalPoints = this.scheduleService.totalPoints;
  totalCourses = this.scheduleService.totalCourses;

  remove(courseCode: string) {
    this.scheduleService.removeCourse(courseCode);
  }

  currentPage = signal(1);
  itemsPerPage = 12;

  searchSubject = signal('all');
  sortKey = signal<'courseCode' | 'courseName' | 'points' | 'subject'>('courseCode');
  sortDirection = signal<'asc' | 'desc'>('asc');

  subjects = computed(() => {
    const list = this.courses();
    return [...new Set(list.map(c => c.subject))];
  });

  filteredCourses = computed(() => {
    const subject = this.searchSubject();

    let result = this.courses();

    if (subject !== 'all') {
      result = result.filter(c => c.subject === subject);
    }

    return result;
  });

  sortedCourses = computed(() => {
    const key = this.sortKey();
    const direction = this.sortDirection();

    const result = [...this.filteredCourses()];

    return result.sort((a, b) => {
      let valueA = a[key];
      let valueB = b[key];

      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  });

  totalPages = computed(() => {
    return Math.max(
      1,
      Math.ceil(this.courses().length / this.itemsPerPage)
    );
  });

  paginatedCourses = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.sortedCourses().slice(start, end);
  });

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  constructor() {
    effect(() => {
      const total = this.totalPages();
      const current = this.currentPage();

      if (total > 0 && current > total) {
        this.currentPage.set(total);
      }

      if (total === 0) {
        this.currentPage.set(1);
      }
    });
  }
}