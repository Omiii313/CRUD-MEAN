import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public showHead: boolean = false;
  constructor(private router: Router) {  // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader(event['url']);
      }
    });
    this.showHeader(this.router.url);
  }
  /**
   * @author om kanada
   * @param url // holds url :string
   * @description This function is used to show/hide header.
   */
  private showHeader(url: string): void {
    if (url === '/login' || url === '/register') {
      this.showHead = false;
    } else {
      this.showHead = true;
    }
  }
}
