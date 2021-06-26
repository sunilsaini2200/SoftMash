import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizeGuard } from "src/api-authorization/authorize.guard";
import { HomeComponent } from "./layout/home/home.component";


const routes: Routes = [
    { path: '', redirectTo: "/home/list-template", pathMatch: "full" },
    { path: 'home', component: HomeComponent, loadChildren: () =>
    import('./profiles/profiles.module').then((m) => m.ProfilesModule) },
    /* Not found redirection */
    { path: "**", redirectTo: '/home/list-template' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
