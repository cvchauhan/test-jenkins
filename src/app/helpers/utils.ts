export default class Utils {
  static checkKeyValPair(data, pair) {
   // console.log(data,pair);
    let isFound: boolean = false;
    data.forEach((elem, index) => {
      if ((elem['name'] = pair['name'])) {
        isFound = true;
      }
    });

    return isFound;
  }


  static checkKeyValPairServPoint(data, pair,pair1) {
   // console.log(data,pair,pair1);
    let isFound: boolean = false;
    data.forEach((elem, index) => {
      if ((elem['nSrvPointid'] == pair && elem['lovName'] == pair1)) {
        isFound = true;
      }
    });

    return isFound;
  }

  static removeByAttr(arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  }

  static formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  static getIndexById(arr,key,val){
   
    let ind = null;
    arr.forEach((element,index) => {
      if(element[key] == val){
        ind = index;
      }
    });
    return ind;
  }



  static intToEnglish(number) {

    var NS = [
      { value: 10000000, str: "Crore" },
      { value: 100000, str: "Lakh" },
      { value: 1000, str: "Thousand" },
      { value: 100, str: "Hundred" },
      { value: 90, str: "Ninety" },
      { value: 80, str: "Eighty" },
      { value: 70, str: "Seventy" },
      { value: 60, str: "Sixty" },
      { value: 50, str: "Fifty" },
      { value: 40, str: "Forty" },
      { value: 30, str: "Thirty" },
      { value: 20, str: "Twenty" },
      { value: 19, str: "Nineteen" },
      { value: 18, str: "Eighteen" },
      { value: 17, str: "Seventeen" },
      { value: 16, str: "Sixteen" },
      { value: 15, str: "Fifteen" },
      { value: 14, str: "Fourteen" },
      { value: 13, str: "Thirteen" },
      { value: 12, str: "Twelve" },
      { value: 11, str: "Eleven" },
      { value: 10, str: "Ten" },
      { value: 9, str: "Nine" },
      { value: 8, str: "Eight" },
      { value: 7, str: "Seven" },
      { value: 6, str: "Six" },
      { value: 5, str: "Five" },
      { value: 4, str: "Four" },
      { value: 3, str: "Three" },
      { value: 2, str: "Two" },
      { value: 1, str: "One" }
    ];
  
    var result = '';
    for (var n of NS) {
      if (number >= n.value) {
        if (number <= 99) {
          result += n.str;
          number -= n.value;
          if (number > 0) result += ' ';
        } else {
          var t = Math.floor(number / n.value);
          // console.log(t);
          var d = number % n.value;
          if (d > 0) {
            return this.intToEnglish(t) + ' ' + n.str + ' ' + this.intToEnglish(d);
          } else {
            return this.intToEnglish(t) + ' ' + n.str;
          }
  
        }
      }
    }
    return result;
  }

}
