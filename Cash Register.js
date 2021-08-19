function checkCashRegister(price, cash, cid) {
    const currencyUnit = {
      "ONE HUNDRED": 10000,
      "TWENTY": 2000,
      "TEN": 1000,
      "FIVE": 500,
      "ONE": 100,
      "QUARTER": 25,
      "DIME": 10,
      "NICKEL": 5,
      "PENNY": 1
    };
    let status = "";
    let cashArr = [];
    let cashReturn = (cash - price)*100;
    let checkCashReturn = cashReturn;
    let cidFilter = cid.filter(value => value[1] !== 0).reverse();
  
  
    let cidSum = 0;
    for(let i = 0; i < cidFilter.length; i++){
      cidSum += cidFilter[i][1];
    }
    cidSum *= 100;
   
   cidFilter.forEach(elem => {
     let checkAmount = 0;
     let cidName = elem[0];
     let cidValue = elem[1]*100;
  
     while(cashReturn >= currencyUnit[cidName] && cidValue > 0){
       cashReturn -=  currencyUnit[cidName];    // od reszty odejmuję dany nominał
       cidValue -= currencyUnit[cidName];
       checkAmount += currencyUnit[cidName];  //to mi sprawdzi czy coś wydałem
     }
     //jeżeli coś mi się udało wydac (dzięki pętli for each sprawdzi mi po kolei dla każdego elementu) dodaj nazwę waluty oraz wysokość
     if(checkAmount !== 0){
       cashArr.push([cidName, checkAmount/100])
     }
   });
   console.log(checkCashReturn)
  if(cashReturn > 0){
    status = "INSUFFICIENT_FUNDS";
    cashArr = [];
  }else if(cashReturn == 0 && checkCashReturn == cidSum){
    status = "CLOSED";
    cashArr = cid;
  }else{
    status= "OPEN";
  }
  return {"status": status,"change":cashArr};
  }
  