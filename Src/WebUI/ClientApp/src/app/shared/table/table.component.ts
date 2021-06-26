import {
    Component,
    OnInit,
    Input,
    OnChanges,
    Output,
    EventEmitter,
    TemplateRef,
  } from "@angular/core";
  import { GlobalConstants } from "../helpers/globalconstants";
  
  @Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
  })
  export class TableComponent implements OnInit, OnChanges {
  
    @Input() PageRecord: number = GlobalConstants.PerPageRecords;
    @Input() loading: boolean = false;
    @Input() rowTemplate: TemplateRef<any>;
    @Input() rowTemplate1: TemplateRef<any>;
    @Input() rowTemplate2: TemplateRef<any>;
    @Output() gridEvent = new EventEmitter<any>();
  
    @Input() pager: boolean = true;
    @Input() filterButton: boolean = true;
  
    constructor() { }
  
    ngOnInit(): void { }
  
    @Input() columns: any = {};
    @Input() data: any = [];
    @Input() filterColumns: any = {};
    @Input() templates: any = {};
    @Input() caption: string;
    columnNames: string[];
  
    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        if ("columns" in changes) {
            this.columnNames = [];
            for (let column in this.columns) {
                this.columnNames.push(column);
                this.filter[column] = "";
            }
        }
        if ("total" in changes) {
            this.changePage(1);
        }
    }
  
    @Output() filterEvent = new EventEmitter<any>();
    @Input() initFilter: any = {};
    filter: any = {};
    showFilter: boolean = false;
  
    toggleFilter(): void {
        //if (!this.showFilter)
            this.showFilter = !this.showFilter;
    }
    refreshData(): void {
        for (var i = 0; i < this.columnNames.length; i++) {
            this.filter[this.columnNames[i]] = "";
        }
        this.sort = "id";
        this.showFilter = false;
        this.changeRefresh(1);
    }
    changeFilter(column, value): void {
  
        this.filter[column] = value;
        this.page = 1;
        this.filterEvent.emit({
            filter: this.filter,
        });
        this.gridEvent.emit({
            filter: this.filter,
        });
    }
  
    @Output() sortEvent = new EventEmitter<any>();
    @Input() sort: string;
    ascending: boolean = false;
  
    changeSort(newSort: string): void {
        if (this.sort == newSort) {
            this.ascending = !this.ascending;
        } else {
            this.sort = newSort;
            this.ascending = true;
        }
        this.sortEvent.emit({
            sort: this.sort,
            ascending: this.ascending,
        });
        this.gridEvent.emit({
            sort: this.sort,
            ascending: this.ascending,
        });
    }
  
    @Input() total: number = 0;
    @Output() pageEvent = new EventEmitter<any>();
    page: number = 1;
    pageSize: number = this.PageRecord;
    pages: number = 0;
  
    first(): void {
        this.changePage(1);
    }
  
    prev(): void {
        this.changePage(Math.max(this.page - 1, 1));
    }
  
    next(): void {
        this.changePage(Math.min(this.page + 1, this.pages));
    }
  
    last(): void {
        this.changePage(this.pages);
    }
  
    changePage(page: number): void {
        let update = page != this.page;
  
        this.page = page;
        this.pages = Math.ceil(this.total / this.pageSize);
  
        if (update) {
            this.pageEvent.emit({
                page: this.page,
                pageSize: this.pageSize,
            });
            this.gridEvent.emit({
                page: this.page,
                pageSize: this.pageSize,
            });
        }
    }
    changeRefresh(page: number): void {
        let update = true;
  
        this.page = page;
        this.pages = Math.ceil(this.total / this.pageSize);
 
        if (update) {
            this.pageEvent.emit({
                page: this.page,
                pageSize: this.pageSize,
            });
            this.gridEvent.emit({
                page: this.page,
                pageSize: this.pageSize,
            });
        }
    }
  
  }
  