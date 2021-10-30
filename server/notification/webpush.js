const webPush = require('web-push');

console.log(webPush.generateVAPIDKeys());

const publlicKey = 'BPcXCJkWsxLnvKJ0KO_5HFl8kr1h_G6S6ini3BJjFYLhyiKDn4sEHBCB7qRKtuInvWVcwOeQKZyqFcZadfs-Xos'
const privateKey = 'cW4_QNaoc4npEfkxpEon5lwValr-dBUxoQ2qPGAwpEE'

const sup = {endpoint:"https://fcm.googleapis.com/fcm/send/ciVuU3S4b58:APA91bFtEJmn2zsK155lsSSqKQePMFWjn4gMEP6r9Guf5i-iV5udqTPn-JpvG48O6FR3LZksG1L4b6eGDL4vL_c2BK2EujDjEsRiDXQZYHOtYrp3Spwyq57HULglnlu6vfiz0Vvto4gf",
expirationTime:null,
keys:{
    p256dh:"BEAnYHx5wG2cFZYYodcssfWlxGwuTGKNp7UXP3DuvZWwbFkCDYtDp0Sy5YlqB5K-OihONLOuh6VT07hr6SkwCos",
    auth:"dUC7ecabwcvNZrFCQPtI-A"
    }
}

webpush.setVapidDetails('mailto:example@yourdomain.org',publlicKey , privateKey)


const payload = {
    "notification": {
        "data":{url: 'http://localhost:8200/#/'},
        "title": "fun of herostatic",
        "vibrate":[100 ,50 , 100]
    }
}

webpush.sendNotification(sup ,JSON.stringify(payload))