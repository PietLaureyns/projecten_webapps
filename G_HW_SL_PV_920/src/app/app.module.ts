import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CalendarModule } from 'angular-calendar';
import { AppRoutingModule } from "./app.routing.module";
import { KalenderModule } from './kalender/kalender.module';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KostenModule } from "./kosten/kosten.module";
import { ProfielModule } from './profiel/profiel.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GezinAanmakenComponent } from './gezin/gezin-aanmaken/gezin-aanmaken.component';
import { HomepageComponent } from './homepage/homepage.component';
import { KindAanmakenComponent } from './gezin/kind-aanmaken/kind-aanmaken.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ColorPickerModule } from './color-picker/color-picker.module';
import { CommonModule } from '@angular/common';
import { DateTimePickerModule } from './date-time-picker/date-time-picker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActiviteitService } from "./kalender/activiteit.service";
import { GesprekkenService } from './berichten/gesprekken.service';
import { UserModule } from './user/user.module';
import { GebruikerService } from './gebruiker.service';
import { GezinComponent } from './gezin/gezin.component';
import { KennisCentrumComponent } from './kennis-centrum/kennis-centrum.component';
import { AddBlogComponent } from "./kennis-centrum/add-blog/add-blog.component";
import { AddReactieComponent } from "./kennis-centrum/add-reactie/add-reactie.component";
import { BlogComponent } from "./kennis-centrum/blog/blog.component";
import { KenniscentrumService } from "./kennis-centrum/kenniscentrum.service";
import { MdDialogModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, 
    GezinAanmakenComponent,
    HomepageComponent,
    KindAanmakenComponent,
    PageNotFoundComponent,
    KennisCentrumComponent,
    AddBlogComponent,
    AddReactieComponent,
    BlogComponent,
    GezinComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    UserModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    KalenderModule,
    KostenModule,
    ProfielModule,
    DateTimePickerModule,
    ColorPickerModule.forRoot(),
    MdDialogModule,
    AppRoutingModule //deze altijd als laatste, staat in slides van routing(20)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl' },
    ActiviteitService,
    GesprekkenService,
    GebruikerService,
    KenniscentrumService
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddBlogComponent,
    AddReactieComponent]
})
export class AppModule { }
