import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngineeringComponent } from './engineering/engineering.component';
import { IslamicLawComponent } from './islamic-law/islamic-law.component';
import { HomeEconomicsComponent } from './home-economics/home-economics.component';
import { MedicineComponent } from './medicine/medicine.component';
import { RightsComponent } from './rights/rights.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : 'engineering', component : EngineeringComponent},
  {path : 'home-economics', component : HomeEconomicsComponent},
  {path : 'islamic-law', component : IslamicLawComponent},
  {path : 'medicine', component : MedicineComponent},
  {path : 'rights', component : RightsComponent},
  {path : '', component : EngineeringComponent}
];

@NgModule({
  declarations: [
    EngineeringComponent,
    IslamicLawComponent,
    HomeEconomicsComponent,
    MedicineComponent,
    RightsComponent
  ],
  imports: [
    CommonModule, SharedModule, RouterModule.forChild(routes)
  ]
})
export class AcademicCoursesModule { }
