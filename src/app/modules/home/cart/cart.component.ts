import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
    
  ) { }

  ngOnInit(): void {
    this.getCartItems();
  }


  // api to get cart items by user id
  getCartItems() {
    // get the user from local storage
    let user = localStorage.getItem('user')
    let payload: any;
    if (user) {
      const parsedUser = JSON.parse(user); // Parse the string into an object
      payload = {
        user_id: parsedUser.user.id
      }
    }

    this.apiService.getCartItems(payload).subscribe(
      (response) => {
        if (response != undefined) {
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

  onBuyClick(productId:any){
    this.router.navigate(['home/settlement'], { queryParams: { id: productId } });

  }


  removeFromCart(event: any, productId: number) {
    // api to removeFromCart
    event.stopPropagation(); 

    // get the user from local storage
    let user = localStorage.getItem('user')
    let payload: any;
    if (user) {
      const parsedUser = JSON.parse(user); // Parse the string into an object
      payload = {
        user_id: parsedUser.user.id,
        product_id: productId
      }
    }

    this.apiService.removeCartItem(payload).subscribe(
      (response) => {
          this.getCartItems();
          this.toastr.success('Product removed from cart successfully');
          //toastr message
      },
      (error) => {
        console.error('Failed to remove product from cart', error);
      }
    );
  }
}