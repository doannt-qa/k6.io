import http from 'k6/http';
import {check} from 'k6';
import {sleep} from 'k6';
// utils
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; // randomIntBetween(min, max). for example: randomIntBetween(1,5)
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'; // randomString(length, [charset]). for exmple: randomString(8) | randomString(1, `AAAABBBCCD`)
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'; // uuidv4()
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// export const options = {
//     stages : [
//         {duration: '3s', target: '10'}, // traffic ramp-up from 1 to {targer} users over {duration} .
//         {duration: '10s', target: '10'}, // stay at {target} users for {duration} 
//         {duration: '3s', target: '0'}, // ramp-down to 0 users
//     ]
// };

// export const options = {
//     vus: 10,
//     duration: '10s'
// };

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = res.json();

    // const crocodileID = crocodiles[0].id;
    // const crocodileName = crocodiles[0].name;
    const crocodileIDs = crocodiles.map(item => item.id);
    const crocodileID = randomItem(crocodileIDs);


    sleep(randomIntBetween(1,5));
    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileID}/`);
    
    console.log(res.headers.Allow);
    console.log(res.headers['Content-Type']);

    check (res, {
        'status code is 200' : (res) => res.status === 200,
        'Crocodile has the correct ID' : (res) => res.json().id === crocodileID
    });

}