import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorizeGuard } from "../../api-authorization/authorize.guard";
import {CreateTemplate} from "./manage-template/create-template/create-template.component";
import { ListTemplate } from "./manage-template/list-template/list-template.component";

const routes: Routes = [
    {path : "create-template",component : CreateTemplate},
    { path: "list-template", component: ListTemplate}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfilesRoutingModule {}