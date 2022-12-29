const params = (new URL(document.location)).searchParams
const orderId = params.get('orderId')
console.log(orderId)

let orderIdResult = document.getElementById("orderId")
orderIdResult.innerHTML = orderId
