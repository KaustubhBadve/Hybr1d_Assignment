CREATE PROCEDURE `getOrderDetailsAgainstBuyer` (sellerId INT) BEGIN
SELECT
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'ItemList',
            item,
            "buyersDetails",
            buyersDetails,
            'totalOrderValue',
            totalOrderValue
        )
    ) as data
FROM
    (
        SELECT
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'itemId',
                    c.id,
                    'name',
                    c.itemName,
                    'price',
                    c.price
                )
            ) as item,
            u.mobileNo as mobileNo,
            JSON_OBJECT(
                'buyerName',
                u.name,
                'buyerId',
                u.id,
                'buyerMobileNo',
                u.mobileNo
            ) as buyersDetails,
            SUM(o.totalCartValue) as totalOrderValue
        FROM
            catalogmaster c
            JOIN ordermappingmaster om ON c.id = om.itemId
            LEFT JOIN ordermaster o ON om.orderId = o.id
            JOIN usersmaster u ON o.buyerId = u.id
        WHERE
            c.sellerId = sellerId
        GROUP BY
            u.id
    ) as temp;

END