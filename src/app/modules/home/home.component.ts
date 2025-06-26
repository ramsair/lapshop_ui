import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;
  displayedProducts: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getProducts().subscribe(
      (response) => {
        if (response != undefined && response.length > 0) {
          this.products = response;
          this.displayedProducts = this.products.slice(0, 4);  // Only display the first 4 products

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
  showNow() {
    this.router.navigate(['home/phones']);
  }
  myOrders()  {
    this.router.navigate(['home/orders']);
  }


  addToCart(event: Event, productId: number){
    // api to addToCart
    event.stopPropagation(); 
    let user = localStorage.getItem('user')
    let  payload :any;
    if(user) {
      const parsedUser = JSON.parse(user); // Parse the string into an object
      payload = {'user_id' : parsedUser?.user?.id, 'product_id' : productId}
    }

    this.apiService.addToCart(payload).subscribe(
      (response) => {
          // this.products = response;
          this.toastr.success('Product Added successfully!', 'Success');
      },
      (error) => {
        console.error('Failed to fetch products', error);
      }
    );

  }
}
