import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
   products: any;
  
    constructor(
      private apiService: ApiService,
      private router: Router,
      private toastr: ToastrService
      
    ) { }
  
    ngOnInit(): void {
      this.getProducts();
    }
  
    getProducts() {
      this.apiService.getOrderedProduct().subscribe(
        (response) => {
          if( response != undefined && response.length > 0) {
            this.products = response;
          }
        },
        (error) => {
          console.error('Failed to fetch products', error);
        }
      );
    }

    onMobileClicked(id: number) {
      // add the id to query params 
      this.router.navigate(['home/details'], { queryParams: { id: id } });
    }
}
