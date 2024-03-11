import React, { useState, useEffect } from "react";
 
export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [amount, setAmount] = useState(1);
  const [productData, setProductData] = useState({
    price: "",
    tax: ""
  });
 
  useEffect(() => {
    showInput();
  }, [selectedProduct, amount]);
 
  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };
 
  const handleAmountChange = (event) => {
    setAmount(parseFloat(event.target.value));
  };
 
  const showInput = async () => {
    try {
const response = await fetch("http://localhost/routes/products.php");
      const dbProduct = await response.json();
      const product = dbProduct.find((p) => String(p.code) === selectedProduct);
      if (product) {
        const tax_value = product.tax_value;
        const price = product.price;
        const totalTax = (tax_value * price * amount) / 100;
        const totalPrice = price * amount;
        setProductData({
          price: totalPrice.toFixed(2),
          tax: totalTax.toFixed(2)
        });
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
 
  return (
    <>
      <select id="selectProducts" onChange={handleProductChange}>
        {/* Options here */}
      </select>
      <input id="amount" type="number" value={amount} onChange={handleAmountChange} />
productData.tax} readOnly />
      <input id="price" type="text" value={productData.price} readOnly />
    </>
  );
}