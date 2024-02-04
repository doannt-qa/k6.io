import http from 'k6/http';
import {check} from 'k6';

export default function() {

    const body = JSON.stringify ({
        username: 'Doannguyen2' + Date.now(),
        // first_name: 'Doan',
        // last_name: 'Nguyen',
        // email: 'doan2@email.com',
        password: '1234567'
    });
    console.log(body);

    const params = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    console.log(params);

    const res = http.post('https://test-api.k6.io/user/register/',body, params);
    check (res, {"status code is 201" : (res) => res.status === 201})
    
}