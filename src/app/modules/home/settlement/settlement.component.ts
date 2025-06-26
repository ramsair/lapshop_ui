import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/service';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css']
})
export class SettlementComponent implements OnInit {
  deliveryAddress: string = '';
  city: string = '';
  postalCode: string = '';
  phone: string = '';
  quantity: number = 1; // Default quantity

  
  // Cart items (For Order Summary)
  cartItems = [
    { name: 'Product 1', price: 100, quantity: 1 },
    { name: 'Product 2', price: 200, quantity: 2 }
  ];
  
  // Payment details
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  productDetails: any;
  productId!: any;
  isOrderPlaced: boolean = false;
  totalPrice: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
    
  ) {
  }

  ngOnInit(): void {
        // get id from query params
        const urlParams = new URLSearchParams(window.location.search);
        this.productId = urlParams.get('id');
    this.getProductDetails(this.productId)
  }
  
  // Delivery form submission handler
  onSubmitDelivery() {
    console.log('Delivery Address:', this.deliveryAddress, this.city, this.postalCode, this.phone);
    // Handle delivery form submission logic here (e.g., save the delivery data)
  }

  // Payment form submission handler
  onSubmitPayment() {
    console.log('Payment Details:', this.cardNumber, this.expiryDate, this.cvv);
    // Handle payment form submission logic here (e.g., process the payment)

    // api to placeOrder
    let user = localStorage.getItem('user')
    let payload: any;

    // check all the fields are filled
    if (this.deliveryAddress == '' || this.city == '' || this.postalCode == '' || this.phone == '' || this.cardNumber == '' || this.expiryDate == '' || this.cvv == '') {
      alert("Please fill all the fields");
      return;
    }
    if (user) {
      const parsedUser = JSON.parse(user); // Parse the string into an object
      // user_id, product_id, order_date, order_status, address, city, postal_code, phone_number, card_number, expiry_date, cvv all this in payload

      payload = {
        'user_id': parsedUser?.user?.id,
        'product_id': this.productId,
        'price': this.totalPrice,
        'order_date': new Date(),
        'order_status': 'Pending',
        'address': this.deliveryAddress,
        'delivery_address': this.deliveryAddress,
        'city': this.city,
        'postal_code': this.postalCode,
        'phone_number': this.phone,
        'card_number': this.cardNumber,
        'expiry_date': this.expiryDate,
        'cvv': this.cvv,
        'quantity': this.quantity
      }
    }
    this.apiService.placeOrder(payload).subscribe(
      (response) => {
        if (response != undefined) {
          this.isOrderPlaced = true;
          this.toastr.success('Order Placed Successfully!', 'Success');
          this.router.navigate(['home/orders'], { queryParams: { id: this.productId } });

        }
      },
      (error) => {
        this.toastr.error('Failed Placing Order!', 'Success');
        console.error('Failed to fetch products', error);
      }
    );

  }

   // get product details by id
   getProductDetails(id: number) {
    this.apiService.getProductById(id).subscribe(
      (response) => {
        if (response != undefined) {
          this.productDetails = response;
          this.updateTotalPrice()
        }
      },
      (error) => {
        console.error('Failed to fetch products', error);
      }
    );
  }

   // Method to increase quantity
   increaseQuantity() {
    this.quantity += 1;
    this.updateTotalPrice();
  }

  // Method to decrease quantity
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
      this.updateTotalPrice();
    }
  }

    // Method to calculate total price
    updateTotalPrice() {
      // Assuming productDetails.price is the actual price
      this.totalPrice = this.quantity * (this.productDetails.price - (this.productDetails.price * 0.10));
    }
}
