import { Component, OnInit } from '@angular/core';
import { ServerCallsService } from '../../../services/server-calls.service';
import { SnotifyService } from 'ng-snotify';
import { Pagination } from '../../../_models/pagination';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

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

  constructor(private serverCalls: ServerCallsService, private snoty: SnotifyService, private _auth: AuthService) { }

  pagination: Pagination;
  ngOnInit() {
    this.loadItems();
  }

  loadItems(){
    this.serverCalls.getFavorites(this._auth.getId(),this.currentPage, this.itemsPerPage, this.minPrice, this.maxPrice,this.selectedType, this.searchTerm, this.selectedOrder).subscribe(
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
