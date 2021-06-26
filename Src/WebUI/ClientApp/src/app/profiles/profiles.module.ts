import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilesRoutingModule } from "./profiles-routing.module";
import { ListTemplate } from "./manage-template/list-template/list-template.component";
import { SharedModule } from "../shared/shared.module";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        ListTemplate
    ],
    imports:[
        CommonModule,       
        ProfilesRoutingModule,  
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class ProfilesModule{}