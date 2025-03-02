"use server"

import ApiDelete from "@/lib/useApi/delete";
import ApiGet from "@/lib/useApi/get"
import ApiPost from "@/lib/useApi/post";
import ApiPut from "@/lib/useApi/put";
import { Issue } from "@/types/Issue";

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
  description: string;
  billingDate: string
}) => {
  try{
    const payment = await ApiPost("/payments", body)
    return payment;
  }catch(e) {
    throw e;
  }
}

export const editPayment = async ({paymentId, body}: {
  paymentId: number;
  body: {
    type: string;
    paymentPlanValue: number;
    paymentPlanDate: string;
    description: string;
    billingDate: string
  }
}) => {
  try{
    const payment = await ApiPut(`/payments/${paymentId}`, body)
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

export const deletePaymentCheck = async (paymentId: number) => {
  try{
    await ApiDelete(`/payment_checks/${paymentId}`)
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

export const editOrder = async ({
  orderId,
  body
}: {
  orderId: number,
  body:{
    supplier: string;
    orderPlanValue: number;
    withdrawalPlanDate: string;
    type: string;
    description: string;
  }
}) => {
  try{
    const order = await ApiPut(`/orders/${orderId}`, body)
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

export const deleteOrderCheck = async (orderCheckId: number) => {
  try{
    await ApiDelete(`/order_checks/${orderCheckId}`)
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

export const getIssue = async (issueId: string): Promise<Issue> => {
  try{
    const repairs = await ApiGet(`/issues/${issueId}`, {"issueId": issueId})
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

export const editRepair = async ({
  repairId,
  body
}: {
  repairId: number,
  body: {
    supplier: string;
    repairPlanValue: number;
    withdrawalPlanDate: string;
    type: string;
    description: string;
  }
}) => {
  try{
    const repair = await ApiPut(`/repairs/${repairId}`, body)
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

export const deleteRepair = async (repairId: number) => {
  try{
    await ApiDelete(`/repairs/${repairId}`)
  }catch(e) {
    throw e;
  }
}

export const deleteRepairCheck = async (repairCheckId: number) => {
  try{
    await ApiDelete(`/repair_checks/${repairCheckId}`)
  }catch(e) {
    throw e;
  }
}
