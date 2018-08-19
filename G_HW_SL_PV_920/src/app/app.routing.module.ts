import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GezinAanmakenComponent } from './gezin/gezin-aanmaken/gezin-aanmaken.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { KostenbeheerComponent } from './kosten/kostenbeheer/kostenbeheer.component';
import { GezinComponent } from './gezin/gezin.component';
import { AuthGuardService } from './user/auth-guard.service';
import { KennisCentrumComponent } from './kennis-centrum/kennis-centrum.component';
import { BlogComponent } from "./kennis-centrum/blog/blog.component";


const appRoutes: Routes = [
  { path: 'kostenbeheer', /*canActivate: [AuthGuardService], loadChildren: './kosten/kosten.module#KostenModule'*/ component: KostenbeheerComponent },
  { path: 'gezinAanmaken', canActivate: [AuthGuardService], component: GezinAanmakenComponent },
  { path: 'gezin', canActivate: [AuthGuardService], component: GezinComponent },
  { path: 'kenniscentrum', canActivate: [AuthGuardService], component: KennisCentrumComponent },
  { path: 'kenniscentrum/blog/:id', canActivate: [AuthGuardService], component: BlogComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: 'homepage', pathMatch: "full" },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}

