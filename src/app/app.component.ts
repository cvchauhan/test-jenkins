import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { BranchService } from './branch.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

declare const InstallTrigger: any;
declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sayluss-repo';
  showHead: boolean = false;
  display: boolean = false;
  userBranches: boolean = false;
  cities: any[];
  expandWidth: boolean = false;
  hideLogin: boolean = false;
  currUrl: string = '';
  menuData: any[] = [];
  currHeading: string = '';
  userBranch;
  branchData: any;
  branchH;
  response: any;

  constructor(
    private router: Router,
    public http: HttpClient,
    private render: Renderer2,
    private BranchService: BranchService,
    private messageService: MessageService,
    private primeNGConfig: PrimeNGConfig
  ) {
    this.menuData = JSON.parse(localStorage.getItem('menuData'));
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/users/login'  || event['url'] == '/change-password') {
          this.showHead = false;
        } else {
          // console.log("NU")
          this.showHead = true;
        }
      }
    });

   router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currUrl = event.url;
        let splittedCurrUrl = this.currUrl?.substring(1);
        console.log(splittedCurrUrl);
        
        if (this.menuData) {
          this.menuData.forEach((elem, index) => {
            elem['submenu'].forEach((e, i) => {
           
              if (splittedCurrUrl == e['path'] || splittedCurrUrl == e['path']?.substring(1)) {
                this.currHeading = e['title'];
         
              }
            });
          });
        }

        // console.log(event.url);
      });
  }

  showDialog() {
    this.display = true;
  }

  ngOnInit() {
    this.BranchLocation();
    this.primeNGConfig.ripple = true;
    let loggedInToken = localStorage.getItem('token');
    if (!loggedInToken || loggedInToken == 'undefined') {
      this.router.navigate(['users/login']);
    }
    // console.log(navigator.userAgent);
    if (!this.getBrowserName()) {
      //this.showDialog();
    }

    //console.log(this.getBrowserName());
    // else{
    //   this.router.navigate(['dashboard']);
    // }
  }

  // onHidePopUp(){
  //   console.log('on hide popup');
  //   localStorage.clear();
  //   this.router.navigate(["users/login"]);

  // }

  getBrowserName() {
    // Opera 8.0+
    const isOpera =
      (!!window['opr'] && !!window['opr'].addons) ||
      !!window['opera'] ||
      navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    const isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]"
    const isSafari =
      /constructor/i.test(window['HTMLElement']) ||
      ((p): boolean => {
        return p.toString() === '[object SafariRemoteNotification]';
      })(!window['safari'] || window['safari'].pushNotification);

    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/ false || !!window.document['documentMode'];

    // Edge 20+
    const isEdge =
      (!isIE && !!window.StyleMedia) ||
      navigator.appVersion.indexOf('Edg') > -1;

    // Chrome 1 - 71
    const isChrome =
      !!window['chrome'] &&
      (!!window['chrome'].webstore || !!window['chrome'].runtime);

    // Blink engine detection
    const isBlink = (isChrome || isOpera) && !!window.CSS;

    var output = 'Detecting browsers by ducktyping:<hr>';
    output += 'isFirefox: ' + isFirefox + '<br>';
    output += 'isChrome: ' + isChrome + '<br>';
    output += 'isSafari: ' + isSafari + '<br>';
    output += 'isOpera: ' + isOpera + '<br>';
    output += 'isIE: ' + isIE + '<br>';
    output += 'isEdge: ' + isEdge + '<br>';
    output += 'isBlink: ' + isBlink + '<br>';
    console.log(output);
    console.log(navigator.appVersion);

    if (isChrome && !isEdge) {
      return true;
    } else {
      return false;
    }

    //document.body.innerHTML = output;
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);

    if (event.altKey && (event.key == 'b' || event.key == 'B')) {
      this.userBranches = true;
      //  alert('clicked alt + B');
    } else {
      this.userBranches = false;
    }

    // //  if (event.key === KEY_CODE.LEFT_ARROW && event.ctrlKey) {
    // //    this.decrement();
    // //  }
  }
 

  showExpand(evt): void {
    //  console.log(evt);
    this.expandWidth = !this.expandWidth;
  }
  getBranch() {
    localStorage.setItem('branchId', this.branchH);
    const empID = localStorage.getItem('empID');
    this.BranchService.getBranchData(empID).subscribe((res) => {
      this.response = res;
      console.log(res);
      if (this.response['status'] == 200) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Update Successfull',
        });
      }
      if (this.response['status'] == 204) {
        console.log('oops not update');
        this.messageService.add({
          severity: 'error',
          summary: this.response.errorMessage,
          detail: 'Not Update',
        });
      }
    });
  }
  //  get Branch and Location
  BranchLocation() {
    const empID = localStorage.getItem('empID');
    this.BranchService.getBranchData(empID).subscribe((res) => {
      this.branchData = res['data'];
    });
  }
}
