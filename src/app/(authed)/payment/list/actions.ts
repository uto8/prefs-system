"use server"

import ApiDelete from "@/lib/useApi/delete";
import ApiGet from "@/lib/useApi/get"
import ApiPost from "@/lib/useApi/post";

export const getPayments = async (issueId: string) => {
  try{
    const payments = await ApiGet("/payments", {"issueId": issueId})
    return payments;
  }catch(e) {
    throw e;
  }
}

export const createPayment = async (body: {
  issueId: number;
  type: string;
  paymentPlanValue: number;
  paymentPlanDate: string;
  description: string
}) => {
  try{
    const payment = await ApiPost("/payments", body)
    return payment;
  }catch(e) {
    throw e;
  }
}


export const createPaymentCheck = async (body: {
  paymentId: number;
  paymentCheckValue: number;
  paymentCheckDate: string;
  description: string;
}) => {
  try{
    const payment = await ApiPost("/payment_checks", body)
    return payment;
  }catch(e) {
    throw e;
  }
}

export const deletePayment = async (paymentId: number) => {
  try{
    await ApiDelete(`/payments/${paymentId}`)
  }catch(e) {
    throw e;
  }
}

export const getOrders = async (issueId: string) => {
  try{
    const orders = await ApiGet("/orders", {"issueId": issueId})
    return orders;
  }catch(e) {
    throw e;
  }
}

export const createOrder = async (body: {
  issueId: number;
  supplier: string;
  orderPlanValue: number;
  withdrawalPlanDate: string;
  type: string;
  description: string;
}) => {
  try{
    const order = await ApiPost("/orders", body)
    return order;
  }catch(e) {
    throw e;
  }
}


export const createOrderCheck = async (body: {
  orderId: number;
  orderCheckValue: number;
  orderCheckDate: string;
}) => {
  try{
    const orderCheck = await ApiPost("/order_checks", body)
    return orderCheck
  }catch(e) {
    throw e;
  }
}

export const deleteOrder = async (orderId: number) => {
  try{
    await ApiDelete(`/orders/${orderId}`)
  }catch(e) {
    throw e;
  }
}

export const getRepairs = async (issueId: string) => {
  try{
    const repairs = await ApiGet("/repairs", {"issueId": issueId})
    return repairs;
  }catch(e) {
    throw e;
  }
}

export const createRepair = async (body: {
  issueId: number;
  supplier: string;
  repairPlanValue: number;
  withdrawalPlanDate: string;
  type: string;
  description: string;
}) => {
  try{
    const repair = await ApiPost("/repairs", body)
    return repair;
  }catch(e) {
    throw e;
  }
}

export const createRepairCheck = async (body: {
  repairId: number;
  repairCheckValue: number;
  repairCheckDate: string;
}) => {
  try{
    const repairCheck = await ApiPost("/repair_checks", body)
    return repairCheck
  }catch(e) {
    throw e;
  }
}
