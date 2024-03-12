const finishBuy = async () => {
  let sumPrice = 0;
  let sumTax = 0;

  if (carrinhoTemp.length > 0) {
    carrinhoTemp.forEach((product) => {
      sumTax += parseFloat(product.tax);
      sumPrice += parseFloat(product.price);
    });
    const response = window.confirm("Deseja finalizar sua compra?");
    if (response) {
      try {
        const ordersResponse = await fetch(
          "http://localhost/routes/orders.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              total: sumPrice,
              tax: sumTax,
            }),
          }
        );
        const orders = await ordersResponse.json();
        const lastOrderCode = orders[orders.length - 1].code;

        for (const product of carrinhoTemp) {
          await fetch("http://localhost/routes/orderItem.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              order_code: lastOrderCode,
              product_code: product.code,
              amount: product.amount,
              tax: product.tax,
              price: product.price,
            }),
          });
        }
        setCarrinhoTemp([]);
        updateTable();
      } catch (error) {
        console.error(error);
        alert(
          "Algo deu errado ao finalizar a compra. Por favor, tente novamente mais tarde."
        );
      }
    }
  }
};
