import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'service'
})
export class ServicePipe implements PipeTransform {

  transform(value: any, searching: any): any {
    if(!value || !searching){
      return value;
    }
    return value.filter(function (search: { skillType: any; srvCode:any; cSrvName:any; cSrvCategory:any; dStartDt:any}) {
      return search.cSrvCategory.toLowerCase().indexOf(searching.toLowerCase()) > -1 ||
      search.srvCode.toLowerCase().indexOf(searching.toLowerCase()) > -1 ||
      search.cSrvName.toLowerCase().indexOf(searching.toLowerCase()) > -1 
      // search.cSrvCategory.toLowerCase().indexOf(searchTerm.toLowerCase()) || 
      // search.dStartDt.toLowerCase().indexOf(searching.toLowerCase())
    })
  }
  transforms(value: any, searchingData: any): any {
    if(!value || !searchingData){
      return value;
    }
    return value.filter(function (search: { skillType: any; items:any; cSrvName:any; cSrvCategory:any; cSrvPointNm:any}) {
      return search.cSrvCategory.toLowerCase().indexOf(searchingData.toLowerCase()) > -1 ||
      search.items.toLowerCase().indexOf(searchingData.toLowerCase()) > -1 ||
      search.cSrvName.toLowerCase().indexOf(searchingData.toLowerCase()) > -1 ||
      search.cSrvPointNm.toLowerCase().indexOf(searchingData.toLowerCase())  
      // search.dStartDt.toLowerCase().indexOf(searching.toLowerCase())
    })
  }

}
