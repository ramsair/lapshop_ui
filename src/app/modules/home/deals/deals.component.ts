import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css']
})
export class DealsComponent implements OnInit {
  products: any;

  constructor(
    private apiService: ApiService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getProducts().subscribe(
      (response) => {
        if (response != undefined && response.length > 0) {
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
