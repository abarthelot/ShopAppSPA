import { Component, OnInit, TemplateRef } from '@angular/core';
import { ServerCallsService } from '../../services/server-calls.service';
import { SnotifyModule, SnotifyService } from "ng-snotify";
import { AuthService } from '../../services/auth.service';
import { Pagination, PaginatedResult } from '../../_models/pagination';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: any[];
  resBody: any;
  currentPage = 1;
  itemsPerPage = 6;
  isCollapsed = true;
  selectedType = 'all';
  selectedLocation = 'all';
  minPrice = 0;
  maxPrice = 0;
  searchTerm = '';
  selectedOrder = 'created-dsc';
  home = true;

  constructor(private serverCalls: ServerCallsService, private snoty: SnotifyService) { }

  pagination: Pagination;

  ngOnInit() {
    this.loadItems();
  }

  loadItems(){
    this.serverCalls.getItems(this.currentPage, this.itemsPerPage, this.minPrice, this.maxPrice,this.selectedType, this.searchTerm, this.selectedOrder).subscribe(
      res => {
	      this.resBody = res.body;
        this.SuccessHandel(this.resBody);
        console.log(res.headers.get('Pagination'));
        if(res.headers.get('Pagination') != null)
        {
          var paginHeaders = res.headers.get('Pagination');
          this.pagination = JSON.parse(paginHeaders);
          console.log(this.pagination);
        }
      },
      err => {
	      this.handleErrors(err);
      }
   );
  }

  SuccessHandel(data){
    this.items = data;
    console.clear();
  }

  handleErrors(error){
    console.log(error);
    this.snoty.error("Failed to load, Please try again later.", "Error");
  }

  pageChanged(event: any): void{
    this.currentPage = event.page;
    console.log(event);
    this.items = [];
    this.loadItems();
  }

  resetFilters(){
    this.selectedType = 'all';
    this.selectedLocation = 'all';
    this.minPrice = 0;
    this.maxPrice = 0;
    this.searchTerm = '';
  }

  basicSearch(){
    this.resetFilters();
    this.isCollapsed = !this.isCollapsed;
  }

}
