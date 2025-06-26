import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent implements OnInit {
   products: any;
    filteredProducts: any[] = []; // Filtered products based on category

    selectedCategory= '';
    // categories = [
    //   { label: 'All', value: 'all' },
    //   { label: 'Flagship Phones', value: 'flagshipPhones' },
    //   { label: 'Budget Phones', value: 'budgetPhones' },
    //   { label: 'Mid-Range Phones', value: 'midRangePhones' },
    //   { label: 'Gaming Phones', value: 'gamingPhones' },
  
    //   { label: 'Foldable Phones', value: 'foldablePhones' },
    //   { label: 'Camera Phones', value: 'cameraPhones' },
    //   { label: '5G Phones', value: '5GPhones' },
    //   { label: 'Battery Phones', value: 'batteryPhones' },
    //   { label: 'Refurbished Phones', value: 'refurbishedPhones' },
    //   { label: 'Dual SIM Phones', value: 'dualSIMPhones' }
    // ];
    categories = [
  { label: 'All', value: 'all' },
  { label: 'Gaming Laptops', value: 'gamingLaptops' },
  { label: 'Ultrabooks', value: 'ultrabooks' },
  { label: 'Budget Laptops', value: 'budgetLaptops' },
  { label: 'Business Laptops', value: 'businessLaptops' },
  { label: '2-in-1 Laptops', value: 'twoInOneLaptops' },
  { label: 'MacBooks', value: 'macbooks' },
  { label: 'Workstation Laptops', value: 'workstationLaptops' },
  { label: 'Chromebooks', value: 'chromebooks' },
  { label: 'Refurbished Laptops', value: 'refurbishedLaptops' },
  { label: 'Touchscreen Laptops', value: 'touchscreenLaptops' }
];

  
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
          if( response != undefined && response.length > 0) {
            this.products = response;
            this.filteredProducts = response; // Initially show all products

          }
        },
        (error) => {
          console.error('Failed to fetch products', error);
        }
      );
    }

      // Filter products based on selected category
  filterProducts() {
    if (this.selectedCategory === '' || this.selectedCategory === 'all') {
      // If no category is selected, show all products
      this.filteredProducts = this.products;
    } else {
      // Filter the products based on the selected category
      this.filteredProducts = this.products.filter((product:any) => product.category === this.selectedCategory);
    }
  }

    onMobileClicked(id: number) {
      // add the id to query params 
      this.router.navigate(['home/details'], { queryParams: { id: id } });
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
