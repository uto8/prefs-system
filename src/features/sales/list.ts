import ApiGet from "@/lib/useApi/get"

export const getSales = async () => {
  const sales = await ApiGet('/sales');
  console.log("sale");
  console.log(sales);
  return sales
}
