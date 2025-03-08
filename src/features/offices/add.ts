import ApiPost from "@/lib/useApi/post";

export const createOffices = async (office: {
  name: string,
  officeCode: string,
  email: string,
  password: string,
  phoneNumber: string,
  address: string,
  cognito_id: string,
  companyId: number,
  isFranchise: boolean,
}) => {
  try{
    const offices = await ApiPost('/offices', office);
    return offices
  }catch(e){
    throw e;
  }
}
