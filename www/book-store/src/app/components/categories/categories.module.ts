import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicCoursesModule } from './academic-courses/academic-courses.module';

const routes: Routes = [
  {
    path: 'acadimic',
    loadChildren: () => import('./academic-courses/academic-courses.module').then(m => m.AcademicCoursesModule)
  },{
    path: 'diplomas',
    loadChildren: () => import('./diplomas/diplomas.module').then(m => m.DiplomasModule)
  },{
    path: 'graduate',
    loadChildren: () => import('./graduate-studies/graduate-studies.module').then(m => m.GraduateStudiesModule)
  },
  {path : '', component : AcademicCoursesModule}
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,SharedModule, RouterModule.forChild(routes)
  ]
})
export class CategoriesModule { }
