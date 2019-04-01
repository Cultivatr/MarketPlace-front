
export function filterData(data, pending ,accepted, sold, delivered, notAccepted) {
  data.forEach(element => {
  if (element.status === 'Pending Approval') {
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

export async function modifyItemLivestock(obj) {
  const {
      id,
      type,
      birthdate,
      regNumber,
      rfid,
      estStartingWeight,
      hangingWeight,
      chargebacks,
      comments,
      deliveredTo,
      deliveredDate,
      dateOnFeed,
      estCompletionDate,
      estFinishedWeight,
      estFinalPrice,
      quantity,
      finalPrice,
      status,
      breed
    } = obj;
    
    try {
      const response = await fetch("http://localhost:5000/livestock/modify/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: id.substring(2),
          type: type,
          birthdate: birthdate,
          regNumber: regNumber,
          rfid: rfid,
          estStartingWeight: estStartingWeight,
          hangingWeight: hangingWeight,
          chargebacks: chargebacks,
          comments: comments,
          deliveredTo: deliveredTo,
          deliveredDate: deliveredDate,
          dateOnFeed: dateOnFeed,
          estCompletionDate: estCompletionDate,
          estFinishedWeight: estFinishedWeight,
          estFinalPrice: estFinalPrice,
          quantity: quantity,
          finalPrice: finalPrice,
          status: status,
          breed: breed
        })
      });
      const json = await response.json();
      console.log(json);
      this.props.showUsers();
    } catch (error) {
      console.log(error);
    }
  };

export async function modifyItemProduce(obj) {
    const {
      id,
      type,
      datePlanted,
      seedType,
      fertilizerTypeUsed,
      pesticideTypeUsed,
      deliveredDate,
      comments,
      estQuantityPlanted,
      estFinishedQty,
      estPrice,
      qtyAcceptedForListing,
      qtyAcceptedAtDelivery,
      chargebacks,
      finalPricePaid,
      deliveredTo,
      status
    } = obj;

    try {
      const response = await fetch("http://localhost:5000/produce/modify/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id: id.substring(2),
          type: type,
          datePlanted: datePlanted,
          seedType: seedType,
          fertilizerTypeUsed: fertilizerTypeUsed,
          pesticideTypeUsed: pesticideTypeUsed,
          deliveredDate: deliveredDate,
          comments: comments,
          estQuantityPlanted: estQuantityPlanted,
          estFinishedQty: estFinishedQty,
          estPrice: estPrice,
          qtyAcceptedForListing: qtyAcceptedForListing,
          qtyAcceptedAtDelivery: qtyAcceptedAtDelivery,
          chargebacks: chargebacks,
          finalPricePaid: finalPricePaid,
          deliveredTo: deliveredTo,
          status: status
        })
      });
      const json = await response.json();
      console.log(json);
      this.props.showUsers();
    } catch (error) {
      console.log(error);
    }
  };