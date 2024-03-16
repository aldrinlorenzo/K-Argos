import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { FileUploadComponent } from "../../pages/file-upload/file-upload.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'compliance',   component: FileUploadComponent },
    // { path: 'trackNTrace',         component: TablesComponent },
    // { path: 'icons',          component: IconsComponent },
    { path: 'trackNTrace',           component: MapsComponent }
];
