import React from "react";

export function filterData(data, pending ,accepted, sold, delivered) {
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
        delivered.push(element)
        return delivered;
      }
    })
}


