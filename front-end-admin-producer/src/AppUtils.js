// import React from "react";

export function filterData(data, pending ,accepted, sold, delivered, notAccepted) {
  data.forEach(element => {
  if (element.status === 'pending') {
      pending.push(element);
      return pending;
    } else if (element.status === 'accepted') {
      accepted.push(element);
      return accepted;
    } else if (element.status === 'sold') {
      sold.push(element);
      return sold;
    } else if (element.status === 'delivered') {
      delivered.push(element);
      return delivered;
    } else if (element.status === 'not accepted') {
      notAccepted.push(element);
      return notAccepted;
    }
  })
}

export function getItemProduceDetails(produce_id, data) {
  let item = data.find((itemInfo) => {
              return itemInfo.produce_id === produce_id;
  })
  return item;  
}

export function getItemLivestockDetails(livestock_id, data) {
  let item = data.find((itemInfo) => {
              return itemInfo.livestock_id === livestock_id;
  })
  return item; 
}

export function getItemDetails(id, data) {
  let item = data.find((itemInfo) => {
              return itemInfo.id === id;
  })
  return item; 
}

export function getUserDetails(id, data) {
  let user = data.find((userInfo) => {
              return userInfo.id === id;
  })
  return user;
}

