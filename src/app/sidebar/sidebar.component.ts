import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { HeaderService } from '../headerservice/header.service';
import { MenuSharedService } from '../shared-services/menu-shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  navigation: MegaMenuItem[] = [];
  showMenu:boolean = true;
  showSubMenu = -1;

  profile: MenuItem[];
  profileToggle:boolean = false;
  navData : any[] = [];
  public userName;
  selected:any;
  public navIcon:boolean = false;

  @Output() showSidebarMenu = new EventEmitter<any>();

  constructor(private router:Router, private headerservice: HeaderService, private menuSharedService : MenuSharedService) { }

  ngOnInit(): void {
    this.navigation = this.headerservice.getNavbar();
    let mData = localStorage.getItem("menuData");
    this.userName = localStorage.getItem("userName");
   
    let d = JSON.parse(mData);
        //d.forEach((elem,ind)=>{
        //this.navData = d;
        //console.log(this.navData);
      //});
      this.navData = d;
      console.log("navvvv",this.navData)
      this.navData.forEach((elem,index)=>{
        this.navData[index]['isMenuOpen'] = false;
      })
      
    this.navigation = [
      {
        label: 'List',
        items: [
          [
          { label: 'List', routerLink: ['/pagename'] }, 
                { label: 'List' }
        ]
      ]
      },
      {
        label: 'List 1',
        items: [
          [
            {label: 'List 1'},
            {label: 'List 1'}
          ]
        ]
      },
      {
        label: 'Custom Item',
        icon: 'custom-icon'
      }
    ]
  }
  toggleProfile(){
    this.profileToggle = !this.profileToggle;
  }
 
  // outside click disable profile popup
  outsideClicked(evt){
    if(evt.target.className === "profile_dropdown"){
      console.log("working")
      this.profileToggle = false
    }
  }
  closeClick(){
    console.log('ffe')
    this.profileToggle = false;
  }
  logout(){
    let userToken = localStorage.getItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("FILLCODEDATA");
    localStorage.removeItem("menuData");
    localStorage.removeItem("branchId");
    this.router.navigate(["users/login"]);
  }
  toogleNav(){
    this.showMenu = !this.showMenu;
    this.showSidebarMenu.emit(this.showMenu);
    this.navData.forEach((elem,index)=>{
        this.navData[index]['isMenuOpen'] = false;
    })
  }
  
  navClick(ind){
    console.log('ind...',ind);
    //this.navData[ind]['isMenuOpen'] = !this.navData[ind]['isMenuOpen'];
    this.navData.forEach((elem,index)=>{
      if(ind == index){
        this.navData[index]['isMenuOpen'] = !this.navData[index]['isMenuOpen'];
      } else {
        this.navData[index]['isMenuOpen'] = false;
      }
       
    })
  }
  mobileMenu(parentInd,childInd){
    console.log(parentInd,childInd);
    // this.navData.forEach((elem,index)=>{
    //   this.navData[index]['isMenuOpen'] = false;
    // })
  }
}
