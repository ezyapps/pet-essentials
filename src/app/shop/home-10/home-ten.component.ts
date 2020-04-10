import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Product } from '../../shared/classes/product';
import { ProductsService } from '../../shared/services/products.service';
import { Router, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home-ten',
  templateUrl: './home-ten.component.html',
  styleUrls: ['./home-ten.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeTenComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  public url : any;

  constructor(private productsService: ProductsService,private router: Router) { 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        console.log(this.url);
      }
});
    }

  ngOnInit() {
  	this.productsService.getProducts().subscribe(product => { 
  	  product.filter((item: Product) => {
         if(item.category == 'pets')
         	this.products.push(item)
      })
    });
    $.getScript('assets/js/script.js');
    // hide search widgets
    document.getElementById("search-widgets").style.display = "none";
  }

  ngOnDestroy() {
    // show search widgets
    document.getElementById("search-widgets").style.display = "block";
  }

}
