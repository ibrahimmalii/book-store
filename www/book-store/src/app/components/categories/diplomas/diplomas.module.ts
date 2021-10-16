import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementAndEconomyComponent } from './management-and-economy/management-and-economy.component';
import { SociologyComponent } from './sociology/sociology.component';
import { AppliedStudiessTestsComponent } from './applied-studiess-tests/applied-studiess-tests.component';
import { ProfessionalDiplomasComponent } from './professional-diplomas/professional-diplomas.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : 'applied-studiess', component : AppliedStudiessTestsComponent},
  {path : 'management-economy', component : ManagementAndEconomyComponent},
  {path : 'professional-diplomas', component : ProfessionalDiplomasComponent},
  {path : 'sociology', component : SociologyComponent},
  {path : '', component : AppliedStudiessTestsComponent}
];

@NgModule({
  declarations: [
    ManagementAndEconomyComponent,
    SociologyComponent,
    AppliedStudiessTestsComponent,
    ProfessionalDiplomasComponent
  ],
  imports: [
    CommonModule,SharedModule, RouterModule.forChild(routes)
  ]
})
export class DiplomasModule { }
