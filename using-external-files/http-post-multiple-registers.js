import http from 'k6/http';
import { check } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';  //k6 doesn't parse CSV files natively, but you can use an external library, Papa Parse

// ========== Read test data from json file
// const userCredentials = new SharedArray('Register new users', function () {
//     return JSON.parse(open('./user-json.json')).users;
//   });


// ========== Read test data from CSV file
const userCredentials = new SharedArray('users with credentials', function () {
    return papaparse.parse(open('./user-csv.csv'), { header: true }).data;
});

// export default function () {
//     userCredentials.forEach((item) => console.log(item.username));
// }

export default function() {

    userCredentials.forEach((item) => {

        const body = JSON.stringify ({
            username: item.username,
            password: item.password
        });
    
        const params = {
            headers: {
                'Content-Type':'application/json'
            }
        };
    
        const res = http.post('https://test-api.k6.io/user/register/',body, params);
        check (res, {"status code is 201" : (res) => res.status === 201}) 
    });

}
