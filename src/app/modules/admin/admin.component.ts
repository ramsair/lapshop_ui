import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/service/service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  products: any;
  // isAdmin: boolean = false;
  editTable: boolean = false;
  dashboardData: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastr: ToastrService
    
  ) { }

  ngOnInit(): void {
    this.getLatestOrders();
    this.getDashboardData();
  }

  // api to get latest orders
  getLatestOrders() {
    this.apiService.getLatestOrders().subscribe(
      (response) => {
        if (response != undefined && response.length > 0) {
          // careate a map to show data in table
          this.products = response.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              price: item.price,
              status: item.status,
              isEditClicked: false,
              order_status: item.order_status
            };
          });

        }
      },
      (error) => {
        console.error('Failed to fetch products', error);
      }
    );
  }

  // update order status
  editStatus(id: number) {

    // update product date bsaed on id
    const order = this.products.find((item: any) => item.id === id);
    if (order) {
      order.isEditClicked = true;
    } 
  }  

  updateOrderStatus(id: number, status: string) {
    // update product date bsaed on id
    const payload = {
      'order_status': status,
      'id': id
    }

    this.apiService.updateOrderStatus(payload).subscribe(
      (response) => {
        if (response != undefined) {
          this.getLatestOrders();
          this.toastr.success('Order status updated successfully');
        }
      },
      (error) => {
        // error tostr
        this.toastr.error('Failed to update order status');
        console.error('Failed to update order status', error);
      }
    );
  }

  // method to get dashboard data
  getDashboardData() {
    this.apiService.getDashboardData().subscribe(
      (response) => {
        if (response != undefined) {
          this.dashboardData = response;
        }
      },
      (error) => {
        console.error('Failed to fetch dashboard data', error);
      }
    );
  }
}
