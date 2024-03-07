const showTotal = () => {
  sumPrice = 0;
  sumTax = 0;
  if (carrinhoTemp.length > 0) {
    carrinhoTemp.forEach((buy) => {
      sumTax += parseFloat(buy.tax);
      sumPrice += parseFloat(buy.price);
    });

    const createInputTotalPrice = document.getElementById("totalprice");
    createInputTotalPrice.value = sumPrice.toFixed(2);

    const createInputTotalTax = document.getElementById("totaltax");
    createInputTotalTax.value = sumTax.toFixed(2);
  }
};