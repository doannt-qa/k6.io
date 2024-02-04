import http from 'k6/http';
import {check} from 'k6';
import { SharedArray } from 'k6/data';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';  //k6 doesn't parse CSV files natively, but you can use an external library, Papa Parse


// ========== Read test data from json file
// const userCredentials = new SharedArray('Register new users', function () {
//     return JSON.parse(open('./user-json.json')).users;
//   });

// ========== Read test data from CSV file
const userCredentials = new SharedArray('users with credentials', function () {
    return papaparse.parse(open('./user-csv.csv'), { header: true }).data;
});


export default function() {

const userCredential = randomItem(userCredentials);

const res = http.post('https://test-api.k6.io/auth/token/login/', 
JSON.stringify ({
    username: userCredential.username,
    password: userCredential.password
}), 
{
    headers: {
        'Content-Type':'application/json'
    }
}
);

console.log ('accessToken' + res.json().access);
check(res, {"status code is 200": (res) => res.status === 200});

}