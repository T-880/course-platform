import { Component, inject } from '@angular/core';
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
}