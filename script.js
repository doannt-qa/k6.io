import http from 'k6/http';
import { check } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

const img1 = open('imgs/DSC_0835.JPG', 'b');

export default function () {
    // Upload files
    const fd = new FormData();
    fd.append('serviceId', '1');
    fd.append('file', http.file(img1, 'DSC_0835.JPG', 'image/png'));

    const uploadImageRes = http.post('http://34.126.91.224/api/v1/orders/files', fd.body(), {
        headers: { 'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwicm9sZSI6Ik5PUk1BTF9VU0VSIiwiaWF0IjoxNzE0MDU5MjA2LCJleHAiOjE3MTQxNDU2MDZ9.iHx6lTZl-afQOPBs6FtLmWZ-AsTDp6sO0b1im7_mhGn1jGyaG9CjQrE33AbATgjXw88_bnZTQaRFOQX30AB7yWjEOb-aDAm_lLL4lZMDYYuyIYJIbxsGxgPXbcciQoMz8nY9AdIWV6JQC3O-Sj864UkBnEb3PwTFhbiiJPCKty36_ESbL7Q40mHRUpo6hk6gwsAm8e2POW60y3M9SHR0mi4UwC4x9Cqy7NuA75dA6cGWMaU72UeHAGXpq4nhso3oR06Gwmi7-mDBTnGXktzXY57ILL2nw0Tkead23YfqfBcrV2N7IW0wKDf68J80aG4BclwBhDu0w1sK7pxQzmvAsK-BJZKVpjTfPycmsRzXjtWPvLeHYyj8OCZB3SHwTCxdpH6806wVEuEEGzuzfUCWIbsgn7YY52WyhcsG5HKnHZvgdGcM1Rz3smTD_VJ6tVUDBvI8l4J0qYl-CJnROwLZtHSZ7AkJCo961frevKhZCGJ5xeoaWxTE7azLGEuCCtd39LrCFCtVCbxsgDcZqDdzWTp0BHCFo4qV816ros5WU1MGIYcPo_YdOduoAXlim-AZ1Qblj7vC7-0ipSWW_K2Ce8df5PvFw-dV6Puq780pYGzzEjSI-al1TatkJupLEjnHHQHjczpMVBwPZPBSn6F6CRcSDnLndy1LWqY1n4anjOA', 'Content-Type': 'multipart/form-data; boundary=' + fd.boundary },
    });

    check(uploadImageRes, {
        'is status 200': (r) => r.status === 200,
    });
    console.log('Response: ' + uploadImageRes.body)
    let key = [];
    key.push(parseInt(uploadImageRes.json().key));

    // Create new order with uploaded image files
    const Orderbody = JSON.stringify ({
        name: 'AUTOTEST_' + Date.now(),
        type: 'ai_only',
        serviceId: '1',
        itemKeys: key,
        settingType: '1',
        settingId: 2
    });

    console.log('Order Body: ' +  Orderbody)

    const createOrderRes = http.post('http://34.126.91.224/api/v1/orders', Orderbody, {
        headers: { 
        'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE3LCJ0eXBlIjoiQUNDRVNTX1RPS0VOIiwicm9sZSI6Ik5PUk1BTF9VU0VSIiwiaWF0IjoxNzE0MDU5MjA2LCJleHAiOjE3MTQxNDU2MDZ9.iHx6lTZl-afQOPBs6FtLmWZ-AsTDp6sO0b1im7_mhGn1jGyaG9CjQrE33AbATgjXw88_bnZTQaRFOQX30AB7yWjEOb-aDAm_lLL4lZMDYYuyIYJIbxsGxgPXbcciQoMz8nY9AdIWV6JQC3O-Sj864UkBnEb3PwTFhbiiJPCKty36_ESbL7Q40mHRUpo6hk6gwsAm8e2POW60y3M9SHR0mi4UwC4x9Cqy7NuA75dA6cGWMaU72UeHAGXpq4nhso3oR06Gwmi7-mDBTnGXktzXY57ILL2nw0Tkead23YfqfBcrV2N7IW0wKDf68J80aG4BclwBhDu0w1sK7pxQzmvAsK-BJZKVpjTfPycmsRzXjtWPvLeHYyj8OCZB3SHwTCxdpH6806wVEuEEGzuzfUCWIbsgn7YY52WyhcsG5HKnHZvgdGcM1Rz3smTD_VJ6tVUDBvI8l4J0qYl-CJnROwLZtHSZ7AkJCo961frevKhZCGJ5xeoaWxTE7azLGEuCCtd39LrCFCtVCbxsgDcZqDdzWTp0BHCFo4qV816ros5WU1MGIYcPo_YdOduoAXlim-AZ1Qblj7vC7-0ipSWW_K2Ce8df5PvFw-dV6Puq780pYGzzEjSI-al1TatkJupLEjnHHQHjczpMVBwPZPBSn6F6CRcSDnLndy1LWqY1n4anjOA', 
        'Content-Type': 'application/json' },
    });

    check(createOrderRes, {
        'is status 201': (r) => r.status === 201,
    });


}
