const domainLink = "https://hidden-escarpment-75213.herokuapp.com/";

export function filterData(
  data,
  pendingAdmin,
  pendingProducer,
  accepted,
  sold,
  delivered,
  notAccepted,
  archive
) {
  pendingAdmin.length = 0;
  pendingProducer.length = 0;
  accepted.length = 0;
  sold.length = 0;
  delivered.length = 0;
  notAccepted.length = 0;
  archive.length = 0;
  data.forEach(element => {
    if (element.status === "Pending Admin") {
      pendingAdmin.push(element);
      return pendingAdmin;
    } else if (element.status === "Pending Producer") {
      pendingProducer.push(element);
      return pendingProducer;
    } else if (element.status === "Accepted") {
      accepted.push(element);
      return accepted;
    } else if (element.status === "Sold") {
      sold.push(element);
      return sold;
    } else if (element.status === "Delivered") {
      delivered.push(element);
      return delivered;
    } else if (element.status === "Not Accepted") {
      notAccepted.push(element);
      return notAccepted;
    } else if (element.status === "Archive") {
      archive.push(element);
      return archive;
    }
  });
}

export function filterForPending(data, pendingProducer) {
  pendingProducer.length = 0;
  data.forEach(element => {
    if (element.status === "Pending Producer") {
      pendingProducer.push(element);
      return pendingProducer;
    }
  });
}

export function getItemDetails(id, data) {
  let item = data.find(itemInfo => {
    return itemInfo.id === id;
  });
  return item;
}

export function getUserDetails(id, data) {
  let user = data.find(userInfo => {
    return userInfo.id === id;
  });
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
    const response = await fetch(domainLink + "/livestock/modify/", {
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
}

export async function modifyItemProduce(obj) {
  console.log("obj", obj);
  const {
    id,
    type,
    packageSize,
    packageSizeUnit,
    estCompletionDate,
    seedType,
    fertilizerTypeUsed,
    pesticideTypeUsed,
    deliveredDate,
    comments,
    estQuantityPlanted,
    certifiedOrganic,
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
    const response = await fetch(domainLink + "/produce/modify/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: id.substring(2),
        type: type,
        packageSize: packageSize,
        packageSizeUnit: packageSizeUnit,
        estCompletionDate: estCompletionDate,
        seedType: seedType,
        fertilizerTypeUsed: fertilizerTypeUsed,
        pesticideTypeUsed: pesticideTypeUsed,
        deliveredDate: deliveredDate,
        comments: comments,
        estQuantityPlanted: estQuantityPlanted,
        certifiedOrganic: certifiedOrganic,
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
}
