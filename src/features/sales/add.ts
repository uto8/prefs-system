import ApiPost from "@/lib/useApi/post";

export const createSales = async (sales: {
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
  address: string,
  cognito_id: string,
  companyId: number
}) => {
  try {
    const createdSales = await ApiPost('/sales', sales);
    return createdSales;
  } catch (e) {
    throw e;
  }
}

