import http from 'k6/http';
import {check} from 'k6';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodile = res.json();
    console.log(crocodile[0].id + '---' + crocodile[0].name);

    const crocodileID = crocodile[0].id;
    const crocodileName = crocodile[0].name;

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileID}/`);
    
    console.log(res.headers.Allow);
    console.log(res.headers['Content-Type']);

    check (res, {'Crocodile name' : (res) = res.json().name = crocodileName});

    
}