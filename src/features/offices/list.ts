import ApiGet from "@/lib/useApi/get"

export const getOffices = async () => {
  const offices = await ApiGet('/offices');
  return offices
}
