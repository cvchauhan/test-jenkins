import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  public baseUrl = environment.baseUrl

  constructor(private http:HttpClient) { }
// API for Designation
parentCategory(id){
  return this.http.get(`${this.baseUrl}/FillDDLWithParentCode?CtgID=${id}`)
}

addSalStructure(data){
  return this.http.post(`${this.baseUrl}/SalaryStructureAdd`, data)
}
  desigList(){
    return this.http.get(`${this.baseUrl}/DesignationList`)
  }
  getBasedOn(){
    return this.http.get(`${this.baseUrl}/DefaultPayheadList`)
  }

  getAllPayHeads(nSalId){
    return this.http.get(`${this.baseUrl}/GetAllPayHeadBySalId?SalId=${nSalId}`)
  }
  payHeadForCalBySalId(nSalId,lastSeq){
    return this.http.get(`${this.baseUrl}/PayHeadForCalBySalid?SalId=${nSalId}&nCalSeq=${lastSeq}`);
  }

  addPayheadD(data){
    return this.http.post(`${this.baseUrl}/PayHeadAddEdit`, data)
  }
  getSalStructureList(){
    return this.http.get(`${this.baseUrl}/GetSalary`)
  }
  deletTableList(id){
    return this.http.delete(`${this.baseUrl}/DesignationDelete?id=${id}`)
  }
  parentDesig(DeptID){
    return this.http.get(`${this.baseUrl}/FillDLLWithDesignation?DeptID=${DeptID}`)
  }
  addDesig(data){
    return this.http.post(`${this.baseUrl}/DesignationAdd`, data)
  }
  editDesignation(id){
    return this.http.put(`${this.baseUrl}/DesignationEdit`, id)
  }
  searchDesig(data){
    return this.http.get(`${this.baseUrl}/DesignationSearch?Search=${data}`)
  }

  editDesingById(id){
    return this.http.get(`${this.baseUrl}/DesignationByID?id=${id}`)
  }

  // API For Payheads
    payTable(){
      return this.http.get(`${this.baseUrl}/PayHeadList`)
    }

    deletePay(id){
      return this.http.delete(`${this.baseUrl}/PayHeadDelete?id=${id}`)
    }

    searchPayHead(filter){
      return this.http.get(`${this.baseUrl}/PayHeadSearch?Search=${filter}`)
    }

    addPayHead(data){
      return this.http.post(`${this.baseUrl}/PayHeadAdd`, data)
    }

    editPayHead(data){
      return this.http.put(`${this.baseUrl}/PayHeadEdit`, data)
    }

    getData(){
      return this.http.get(`${this.baseUrl}/FillDDLWithCode`)
    }
    editPayHeadById(id){
      return this.http.get(`${this.baseUrl}/PayHeadByID?id=${id}`)
    }

    getBranch(empID){
      return this.http.get(`${this.baseUrl}/FillDLLWithBranch?UserId=${empID}`)
    }

    getshift(){
      return this.http.get(`${this.baseUrl}/GetShift`);
    }

    getEmployeeShift(shfid,dptid,bid){
      return this.http.get(`${this.baseUrl}/GetEmployeeShift?ShiftId=${shfid}&DeptId=${dptid}&Branch=${bid}`);
    }

    addShift(data){
      return this.http.post(`${this.baseUrl}/ShiftAddEdit`,data);
    }

    getShiftById(id){
      return this.http.get(`${this.baseUrl}/GetShiftById?ShiftId=${id}`);
    }

    getLedgerList(gid){
      return this.http.get(`${this.baseUrl}/LedgerSearch?Search=""&?GroupType=${gid}`);
    }

    getSalaryStructure = () => this.http.get(`${this.baseUrl}/GetSalary`);

    getEmployeeAttendance(SalaryMonth,BranchId){
      return this.http.get(`${this.baseUrl}/GetEmployeeAttendance?SalaryMonth=${SalaryMonth}&BranchId=${BranchId}`);
    }
}
