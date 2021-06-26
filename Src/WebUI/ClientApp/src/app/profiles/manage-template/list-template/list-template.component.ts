import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EmployeesClient, GridQuery } from 'src/app/SoftMash-Api';

@Component({
    selector : "app-list-template",
    templateUrl : "./list-template.component.html",
    styleUrls : ["./list-template.component.css"]
})
export class ListTemplate implements OnInit{
    vm: any = [] ;
    loading: boolean = false;
    loaderText: string = "Loading";

    constructor(
private employeesClient: EmployeesClient,
private title:Title
){}
   
ngOnInit(): void {
    this.loading = true;
   this.query = { ...this.query, ...this.init };       
    this.reload();
    this.title.setTitle("Custmor listing");
    
}
init: any = {
    filter: {

    },
    sort: 'createdDate',
    ascending: false
}

query: GridQuery = <GridQuery>{
    page: 1,
    pageSize: 15,
    filter: {},
    ascending: true
}


gridUpdate(e: any): void {
    this.query = { ...this.query, ...e };
    this.reload();
}

reload() {
    
    this.loading = true;
    this.employeesClient.getCustomersQuery(this.query).subscribe(
        request => {
            this.loading = false;
            this.vm =request.data;
            
            console.log(this.vm);
            this.loading = false;
        }, error => {
            console.log(error);
        }
    );
}
export(): void{
    debugger;
    this.loading =true;
    this.loaderText = "Exporting";
 
    this.employeesClient.exportCustmor(this.query)
    .subscribe(
        result =>{
           this.loading =false;
            let a = document.createElement('a');
           document.body.appendChild(a);
          a.style.display ="none";
          let url = URL.createObjectURL(result.data);
          a.href = url;
          a.download = result.fileName;
          a.click();
          window.URL.revokeObjectURL(url);
        }, error => {this.loading = false;},
    );
}
    }