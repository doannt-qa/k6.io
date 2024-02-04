import http from 'k6/http';
import {check} from 'k6';

export default function() {

const body = JSON.stringify ({
    username: 'Doannguyen21707041571690',
    password: '1234567'
});

const params = {
    headers: {
        'Content-Type':'application/json'
    }
};

const res = http.post('https://test-api.k6.io/auth/token/login/', body, params);

console.log ('accessToken' + res.json().access);

check(res, {"status code is 200": (res) => res.status === 200});


}