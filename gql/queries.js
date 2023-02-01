import { gql } from "@apollo/client";


export const GET_WORKERS = gql`
query GET_WORKERS {
    worker {
      name
      email
      phonenumber
    }
  }`;

export const GET_WORKERS_FROM_FARM = gql`
query GET_WORKERS_FROM_FARM($farmId: Int!) {
  farmStaff(where: {farmId: {_eq: $farmId}}) {
    worker {
      id 
      name
      country
      city
    }
  }
}`;

export const GET_FIELDOWNERS = gql`
query GET_FIELDOWNERS {
    fieldowner(order_by: {name: asc}) {
      id
      name
      country
      city
      language
      farms{
        id
      }
    }
  }`;

export const GET_FIELDOWNER_FARMS = gql`
query GET_FIELDOWNER_FARMS($farmId: Int!) {
  farm(where: {id: {_eq: $farmId}}) {
    id
    name
    startdate
  }
}`;

export const GET_WORKER_DETAILS = gql`
query GET_WORKER_DETAILS($id: Int!) {
  worker(where: {id: {_eq: $id}}) {
    id
    name
    country
    city
    language
    phonenumber
    email
  }
}`;

export const GET_FIELDOWNER_DETAILS = gql`
query GET_FIELDOWNER_DETAILS($id: Int!) {
  fieldowner(where: {id: {_eq: $id}}) {
    id
    name
    country
    city
    language
    farms (order_by: {name: asc}){
      id
      name
      startdate
      fields {
        id
        name
      }
    }
  }
}`;

export const GET_FARM_DETAILS = gql`
query GET_FARM_DETAILS($id: Int!) {
  farm(where: {id: {_eq: $id}}) {
    id
    name
    startdate
    fields {
      id
      name
    }
  }
}`;

export const GET_FIELD = gql`
query GET_FIELD($id: Int!) {
  field(where: {id: {_eq: $id}}) {
    id
    name
  }
}`;