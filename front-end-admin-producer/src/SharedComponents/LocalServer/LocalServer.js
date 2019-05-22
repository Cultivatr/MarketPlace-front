// THE BELOW DOMAIN IS FOR LOCAL SERVER
// const domain = "http://localhost:300";
// THE BELOW DOMAIN IS FOR HEROKU SERVER
// const domain = 

export function sendEmailQuery(farmName, email) {
    return fetch(`${domain}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            farmName: farmName,
            userEmail: email
        })
    }).then(response => response.json());
}