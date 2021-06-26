import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';
import { HomeComponent } from './layout/home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SidebarMenuComponent } from './layout/sidebar-menu/sidebar-menu.component';
import { AppRoutingModule } from './app.routing';
import { LoaderComponent } from './core/loader/loader.component';
import { MainMaterialModule } from './core/main-material.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { LoadderService } from './services/loader/loadder.service';
import { FileuploadService } from './services/fileupload/fileupload.service';
import { ProfilesModule } from './profiles/profiles.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SidebarMenuComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MainMaterialModule,
    SharedModule,
    ApiAuthorizationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    ProfilesModule
  ],
  providers: [
    LoadderService,
    FileuploadService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
