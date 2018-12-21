import { filterData, getIdData } from "./AppUtils";

const db =   
    [
    {
    "farm": "jk farms",
    "product": "steak",
    "qty": 1,
    "date": "2018-12-18",
    "id": 1,
    "status": "accepted"
    },
    {
    "farm": "ct farms",
    "product": "carrots",
    "qty": 100,
    "date": "2018-12-10",
    "id": 2,
    "status": "pending"
    },
    {
    "farm": "lm farms",
    "product": "cabbage",
    "qty": 50,
    "date": "2018-12-12",
    "id": 3,
    "status": "delivered"
    },
    {
    "farm": "ras farms",
    "product": "steak",
    "qty": 5,
    "date": "2018-12-11",
    "id": 4,
    "status": "sold"
    }
]

console.log("hello world");

test ('should get pending', () => {
    let pending = [];
    let accepted = [];
    let sold = [];
    let delivered = [];
    filterData(db, pending, accepted, sold, delivered);
    expect(pending[0].farm).toBe("ct farms")
    expect(accepted[0].farm).toBe("jk farms")
    expect(delivered[0].farm).toBe("lm farms")
    expect(sold[0].farm).toBe("ras farms")
});

test ('should get item details', () => {
    let farm1 = getIdData(1, db)
    expect(farm1.farm).toBe("jk farms")
    expect(farm1.product).toBe("steak")
    expect(farm1.qty).toBe(1)
    expect(farm1.date).toBe("2018-12-18")
    expect(farm1.status).toBe("accepted")
});


