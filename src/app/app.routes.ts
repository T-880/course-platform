import { Routes } from '@angular/router';
import { Schedule } from './pages/schedule/schedule';
import { CourseList } from './pages/course-list/course-list';

export const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CourseList },
  { path: 'schedule', component: Schedule },
  { path: '**', redirectTo: 'courses' }
];