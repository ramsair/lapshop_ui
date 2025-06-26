import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  productId: any;
  productDetails: any;
  constructor(
    private apiService: ApiService,
    private router: Router
    
  ) { }


  ngOnInit(): void {
    // get id from query params
    const urlParams = new URLSearchParams(window.location.search);
    this.productId = urlParams.get('id');
    if (this.productId != null) {
      this.getProductDetails(Number(this.productId));
    }
  }

  // get product details by id
  getProductDetails(id: number) {
    this.apiService.getProductById(id).subscribe(
      (response) => {
        if (response != undefined) {
          this.productDetails = response;
        }
      },
      (error) => {
        console.error('Failed to fetch products', error);
      }
    );
  }

  onBuyClick(){
    this.router.navigate(['home/settlement'], { queryParams: { id: this.productId } });

  }

}
