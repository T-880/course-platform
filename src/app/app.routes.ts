import { Routes } from '@angular/router';
import { Schedule } from './pages/schedule/schedule';
import { CourseList } from './pages/course-list/course-list';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'courses', component: CourseList },
  { path: 'schedule', component: Schedule },
  { path: '**', redirectTo: 'courses' }
];