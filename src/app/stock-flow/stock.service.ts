import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  public baseUrl = environment.baseUrl

  constructor(private httpClient:HttpClient) { }

  // Manage Stock API for Stock Item Tab

  stockItemList(){
    return this.httpClient.get(`${this.baseUrl}/ItemList`)
  }
  stockItemFilter(searchData){
    return this.httpClient.get(`${this.baseUrl}/ItemSearch?Search=${searchData}`)
  }

  stockItemDel(id){
    return this.httpClient.delete(`${this.baseUrl}/ItemDelete?id=${id}`);
  }

  stockItemAdd(data){
    return this.httpClient.post(`${this.baseUrl}/ItemAdd`,data);
  }

  itemStockEditById(id){
    return this.httpClient.get(`${this.baseUrl}/ItemByID?id=${id}`)
  }

  itemEdit(data){
    return this.httpClient.put(`${this.baseUrl}/ItemEdit`, data)
  }

  priceItemDelete(id){
    return this.httpClient.delete(`${this.baseUrl}/ItemPriceDelete?id=${id}`);
  }

  getBranch(empID){
    return this.httpClient.get(`${this.baseUrl}/FillDLLWithBranch?UserId=${empID}`)
  }
  addPriceData(data){
    return this.httpClient.post(`${this.baseUrl}/ItemPriceAdd`,data)
  }
  updatePriceData(data){
    return this.httpClient.put(`${this.baseUrl}/ItemPriceEdit`,data)
  }
  getSubStockList(id){
    return this.httpClient.get(`${this.baseUrl}/ItemPriceListByItemId?ItemId=${id}`)
  }
  addTaxDetails(data){
    return this.httpClient.post(`${this.baseUrl}/TaxDetailAdd`,data);
  }
  getTaxDetailList(){
    return this.httpClient.get(`${this.baseUrl}/TaxDetailBySearch?Search=""`);
  }

  loadItemGroups(){
    return this.httpClient.get(`${this.baseUrl}/ItemGroup`);
  }

  getFillDDLWithCodeByCtgParent(id){
    return this.httpClient.get(`${this.baseUrl}/FillDDLWithCodeByCtgParent?CtgID=${id}`);
  }


}
