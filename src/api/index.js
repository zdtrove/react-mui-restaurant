export const getAllCustomer = () => {
    return [
        {
            "customerId": 1,
            "customerName": "Hewet Sparkes"
        },
        {
            "customerId": 2,
            "customerName": "Adora Ormesher"
        },
        {
            "customerId": 3,
            "customerName": "Adore Jachimak"
        },
        {
            "customerId": 4,
            "customerName": "Francine Franke"
        },
        {
            "customerId": 5,
            "customerName": "Cordi Hasel"
        },
        {
            "customerId": 6,
            "customerName": "Merrie Swinburn"
        },
        {
            "customerId": 7,
            "customerName": "Willi Thoresbie"
        },
        {
            "customerId": 8,
            "customerName": "Darryl Duffil"
        },
        {
            "customerId": 9,
            "customerName": "Corissa Conechie"
        },
        {
            "customerId": 10,
            "customerName": "Thorn Yakobowitch"
        }
    ]
}

export const getAllFoodItem = () => {
    return [
        {
            "foodItemId": 1,
            "foodItemName": "Scallops - Live In Shell",
            "price": 54.4
        },
        {
            "foodItemId": 2,
            "foodItemName": "Wine - Pinot Noir Mondavi Coastal",
            "price": 41.74
        },
        {
            "foodItemId": 3,
            "foodItemName": "Beer - Heinekin",
            "price": 7.0
        },
        {
            "foodItemId": 4,
            "foodItemName": "Chilli Paste, Ginger Garlic",
            "price": 51.88
        },
        {
            "foodItemId": 5,
            "foodItemName": "Cocktail Napkin Blue",
            "price": 75.84
        },
        {
            "foodItemId": 6,
            "foodItemName": "Crackers - Trio",
            "price": 18.56
        },
        {
            "foodItemId": 7,
            "foodItemName": "Vacuum Bags 12x16",
            "price": 88.81
        },
        {
            "foodItemId": 8,
            "foodItemName": "Ice Cream - Strawberry",
            "price": 47.78
        },
        {
            "foodItemId": 9,
            "foodItemName": "Dawn Professionl Pot And Pan",
            "price": 65.0
        },
        {
            "foodItemId": 10,
            "foodItemName": "Flour Dark Rye",
            "price": 70.64
        },
        {
            "foodItemId": 11,
            "foodItemName": "Shrimp, Dried, Small / Lb",
            "price": 55.34
        },
        {
            "foodItemId": 12,
            "foodItemName": "Bagel - 12 Grain Preslice",
            "price": 26.82
        },
        {
            "foodItemId": 13,
            "foodItemName": "Mahi Mahi",
            "price": 5.56
        },
        {
            "foodItemId": 14,
            "foodItemName": "Pork - Kidney",
            "price": 90.99
        },
        {
            "foodItemId": 15,
            "foodItemName": "Beef - Ground Medium",
            "price": 60.5
        },
        {
            "foodItemId": 16,
            "foodItemName": "Wine - Saint Emilion Calvet",
            "price": 42.91
        },
        {
            "foodItemId": 17,
            "foodItemName": "Cake Sheet Combo Party Pack",
            "price": 84.93
        },
        {
            "foodItemId": 18,
            "foodItemName": "Veal - Bones",
            "price": 89.38
        },
        {
            "foodItemId": 19,
            "foodItemName": "Island Oasis - Magarita Mix",
            "price": 43.59
        },
        {
            "foodItemId": 20,
            "foodItemName": "Sugar - White Packet",
            "price": 31.25
        }
    ]
}

export const createOrder = newRecord => {
    const orders = JSON.parse(localStorage.getItem('orders'))
    if (orders) {
        orders.push(newRecord)
        localStorage.setItem('orders', JSON.stringify(orders))
    } else {
        localStorage.setItem('orders', JSON.stringify([{ ...newRecord }]))
    }

}

export const getAllOrder = () => {
    return localStorage.getItem('orders')
}

export const getOrderById = id => {
    const orders = JSON.parse(localStorage.getItem('orders'))
    return orders.filter(order => Number(order.id) === Number(id))[0]
}

export const updateOrderById = (id, newRecord) => {
    const orders = JSON.parse(localStorage.getItem('orders'))
    const index = orders.findIndex(order => Number(order.id) === Number(id))
    orders[index] = newRecord
    localStorage.setItem('orders', JSON.stringify(orders))
    return orders
}

export const deleteOrder = id => {
    const orders = JSON.parse(localStorage.getItem('orders'))
    const newOrders = orders.filter(order => Number(order.id) !== Number(id))
    localStorage.setItem('orders', JSON.stringify(newOrders))
    return newOrders
}