import http from 'k6/http';
import {check} from 'k6';

export default function () {

     // ---------------POST LOGIN API ----------------------------
    let res = http.post('https://test-api.k6.io/auth/token/login/', 
    JSON.stringify ({
            username: 'Doannguyen21707041571690',
            password: '1234567'
    }), 
    {
        headers: {
            'Content-Type':'application/json'
        }
        
    });
    const accessToken = res.json().access;

    // ---------------GET PRIVATE API ----------------------------
    res = http.get('https://test-api.k6.io/my/crocodiles/', {
        headers : {
            Authorization : 'Bearer ' + accessToken
        }
    });
    console.log(res.json())
    check (res, {'Status code of login request is 200' : (res) => res.status === 200});

    // ---------------POST PRIVATE API ----------------------------
   res = http.post('https://test-api.k6.io/my/crocodiles/', 
    JSON.stringify({
        name: 'Doan2',
        sex: 'M',
        date_of_birth: '1900-10-29'
    }), 
    {
        headers: {
            Authorization : 'Bearer ' + accessToken,
            'Content-Type':'application/json'
        }
    });

    const crocodileID = res.json().id;
    console.log('crocodileID: ' + crocodileID);
    check(res, {'Status code of creation request is 201': (res) => res.status === 201});

    // ---------------GET PRIVATE API AFTER CREATION ----------------------------
    res = http.get(`https://test-api.k6.io/my/crocodiles/${crocodileID}/`, {
        headers : {
            Authorization : 'Bearer ' + accessToken
        }
    });
    console.log(res.json())
    check (res, {
        'Status code OF get detail is 200' : (res) => res.status === 200,
        'Crocodile id is' : (res) => res.json().id === crocodileID
    });

     // ---------------PUT PRIVATE API of an existing object ----------------------------
     res = http.put(`https://test-api.k6.io/my/crocodiles/${crocodileID}`, 
     JSON.stringify(
        {
         name: 'Doan3',
         sex: 'F',
         date_of_birth: '1900-10-30'
        }
        ), 
     {
         headers: {
             Authorization : 'Bearer ' + accessToken,
             'Content-Type':'application/json'
         }
     });

     console.log(res.json());
     check (res, {
        'Status code OF put is 200' : (res) => res.status === 200, 
        'Crocodile name shoudl be Doan 3' : (res) => res.json().name === 'Doan3'
    });

    // --
   // ---------------DELETE PRIVATE API of an existing object ---------------------------
    res = http.del(`https://test-api.k6.io/my/crocodiles/${crocodileID}/`, null, 
    {
        headers: {
            Authorization : 'Bearer ' + accessToken
        }
    });

    check (res, {
       'Status code OF delete is 204' : (res) => res.status === 204
   });

}