
// const domainLink = "https://hidden-escarpment-75213.herokuapp.com";
const domainLink = "https://mysterious-cove-46763.herokuapp.com";
// const domainLink = "http://localhost:5000";


export function loginQuery(googleEmail) {
    return fetch(domainLink + "/login/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            email: googleEmail
        })
    })
        .then(response => response.json())
}

export function refreshProduceItems() {
    return fetch(
        domainLink + `/produceItems/all/`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }
    );
}

export function deleteProduceItem(itemToDelete) {

    return fetch(domainLink + "/produceItems/delete/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            itemToDelete: itemToDelete
        })
    })
        .then(response => response.json())
}
export function addProduceItem(itemToAdd) {
    return fetch(domainLink + "/produceItems/add/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            newItem: itemToAdd
        })
    })
        .then(response => response.json())
}

export function addNewProducer(details) {
    return fetch(domainLink + "/admin/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            firstName: details.firstName,
            lastName: details.lastName,
            billingAddressStreet: details.billingAddressStreet,
            primaryNumber: details.primaryNumber,
            secondaryNumber: details.secondaryNumber,
            billingAddressCity: details.billingAddressCity,
            billingAddressProvince: details.billingAddressProvince,
            email: details.email.toLowerCase(),
            billingAddressCountry: details.billingAddressCountry,
            billingAddressPostalCode: details.billingAddressPostalCode,
            farmName: details.farmName,
            farmLocation: details.farmLocation,
            mailingAddressStreet: details.mailingAddressStreet,
            farmType: details.farmType,
            area: details.area,
            mailingAddressCity: details.mailingAddressCity,
            mailingAddressProvince: details.mailingAddressProvince,
            rating: details.rating,
            mailingAddressCountry: details.mailingAddressCountry,
            mailingAddressPostalCode: details.mailingAddressPostalCode,
            comments: details.comments,
            isAdmin: details.isAdmin,
            isProducer: details.isProducer,
            isOther: details.isOther
        })
    })
}
export function modifyUserQuery(user) {
    return fetch(domainLink + "/admin/updateUsers/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            billingAddressStreet: user.billingAddressStreet,
            primaryNumber: user.primaryNumber,
            secondaryNumber: user.secondaryNumber,
            billingAddressCity: user.billingAddressCity,
            billingAddressProvince: user.billingAddressProvince,
            email: user.email.toLowerCase(),
            billingAddressCountry: user.billingAddressCountry,
            billingAddressPostalCode: user.billingAddressPostalCode,
            farmName: user.farmName,
            farmLocation: user.farmLocation,
            mailingAddressStreet: user.mailingAddressStreet,
            farmType: user.farmType,
            area: user.area,
            mailingAddressCity: user.mailingAddressCity,
            mailingAddressProvince: user.mailingAddressProvince,
            rating: user.rating,
            mailingAddressCountry: user.mailingAddressCountry,
            mailingAddressPostalCode: user.mailingAddressPostalCode,
            comments: user.comments,
            isAdmin: user.isAdmin,
            isProducer: user.isProducer,
            isOther: user.isOther
        })
    })
}

export function loadUserQuery() {

    return fetch(domainLink + "/admin/users/", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
}

export function loadProduceQuery() {
    return fetch(domainLink + "/produce/all/", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
}

export function loadLivestockQuery() {
    return fetch(domainLink + "/livestock/all/", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
}

export function loadUserSpecificLivestockQuery(user1) {
    return fetch(domainLink + `/livestock/${user1}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
}

export function loadUserSpecificProduceQuery(user1) {
    return fetch(domainLink + `/produce/${user1}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });
}

export function sendEmailQuery(farm, email) {
    fetch(domainLink + "/email/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            farmName: farm,
            email: email
        })
    });
}

export function incrementLivestockQuery(subId, nextStatus) {
    return fetch(domainLink + "/livestock/incrementStatus/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            id: subId,
            nextStatus: nextStatus
        })
    })
}

export function incrementProduceQuery(subId, nextStatus) {
    return fetch(domainLink + "/produce/incrementStatus/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            id: subId,
            nextStatus: nextStatus
        })
    })
}
export function deleteUserQuery(userId) {
    fetch(domainLink + "/admin/users/delete/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            id: userId
        })
    })
}

export function addLivestockQuery(data, dateOnFeed, estCompletionDate, birthdate) {
    return fetch(domainLink + "/livestock/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            userId: JSON.parse(sessionStorage.getItem("authData")).id,
            type: data.type,
            breed: data.breed,
            singleBrand: data.singleBrand,
            birthdate: birthdate,
            regNumber: data.regNumber,
            rfid: data.rfid,
            estStartingWeight: data.estStartingWeight,
            hangingWeight: data.hangingWeight,
            chargebacks: data.chargebacks,
            dateOnFeed: dateOnFeed,
            feedMethod: data.feedMethod,
            typeOfPasture: data.typeOfPasture,
            typeOfFeed: data.typeOfFeed,
            estCompletionDate: estCompletionDate,
            estFinishedWeight: data.estFinishedWeight,
            estFinalPrice: data.estFinalPrice,
            finalPrice: data.finalPrice,
            deliveredDate: data.deliveredDate,
            deliveredTo: data.deliveredTo,
            comments: data.comments,
            status: data.status,
            quantity: data.quantity
        })
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

export function addProduceQuery(data, estCompletionDate) {
    return fetch(domainLink + "/produce/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            userId: JSON.parse(sessionStorage.getItem("authData")).id,
            type: data.type,
            packageType: data.packageType,
            packageSize: data.packageSize,
            packageSizeUnit: data.packageSizeUnit,
            estCompletionDate: estCompletionDate,
            seedType: data.seedType,
            modifiedSeed: data.modifiedSeed,
            heirloom: data.heirloom,
            fertilizerTypeUsed: data.fertilizerTypeUsed,
            pesticideTypeUsed: data.pesticideTypeUsed,
            estQuantityPlanted: data.estQuantityPlanted,
            certifiedOrganic: data.certifiedOrganic,
            estFinishedQty: data.estFinishedQty,
            estPrice: data.estPrice,
            qtyAcceptedForListing: data.qtyAcceptedForListing,
            qtyAcceptedAtDelivery: data.qtyAcceptedAtDelivery,
            chargebacks: data.chargebacks,
            finalPricePaid: data.finalPricePaid,
            deliveredTo: data.deliveredTo,
            deliveredDate: data.deliveredDate,
            comments: data.comments,
            status: data.status
        })
    })
        .then(response => response.json())
}

export function modifyItemLivestockQuery(livestockItem) {
    return fetch(domainLink + "/livestock/modify/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            id: livestockItem.id.substring(2),
            type: livestockItem.type,
            birthdate: livestockItem.birthdate,
            regNumber: livestockItem.regNumber,
            rfid: livestockItem.rfid,
            estStartingWeight: livestockItem.estStartingWeight,
            hangingWeight: livestockItem.hangingWeight,
            chargebacks: livestockItem.chargebacks,
            comments: livestockItem.comments,
            deliveredTo: livestockItem.deliveredTo,
            deliveredDate: livestockItem.deliveredDate,
            dateOnFeed: livestockItem.dateOnFeed,
            estCompletionDate: livestockItem.estCompletionDate,
            estFinishedWeight: livestockItem.estFinishedWeight,
            estFinalPrice: livestockItem.estFinalPrice,
            quantity: livestockItem.quantity,
            finalPrice: livestockItem.finalPrice,
            status: livestockItem.status,
            breed: livestockItem.breed
        })
    });
}

export function modifyItemProduceQuery(produceItem) {
    return fetch(domainLink + "/produce/modify/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            id: produceItem.id.substring(2),
            type: produceItem.type,
            packageSize: produceItem.packageSize,
            packageSizeUnit: produceItem.packageSizeUnit,
            estCompletionDate: produceItem.estCompletionDate,
            seedType: produceItem.seedType,
            fertilizerTypeUsed: produceItem.fertilizerTypeUsed,
            pesticideTypeUsed: produceItem.pesticideTypeUsed,
            deliveredDate: produceItem.deliveredDate,
            comments: produceItem.comments,
            estQuantityPlanted: produceItem.estQuantityPlanted,
            certifiedOrganic: produceItem.certifiedOrganic,
            estFinishedQty: produceItem.estFinishedQty,
            estPrice: produceItem.estPrice,
            qtyAcceptedForListing: produceItem.qtyAcceptedForListing,
            qtyAcceptedAtDelivery: produceItem.qtyAcceptedAtDelivery,
            chargebacks: produceItem.chargebacks,
            finalPricePaid: produceItem.finalPricePaid,
            deliveredTo: produceItem.deliveredTo,
            status: produceItem.status
        })
    });
}
