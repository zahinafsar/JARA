const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

var serviceAccount = require('./jara-computers-firebase-adminsdk-fb28n-28db6cc309.json');
const token =
  'f2De2D70TbWSzjmu-nPWFg:APA91bG8Z1hjCGd6AWFGb2GdHO2wmAkt7gpyhZ3bGIGqKwPDZUjWAEXR33dPUbJZJjfwRChfaSVnQKmnLrTRWjA_jow5Gzo5UcwqSdK8eb3Rvpixm6GaoohPCBTtFl29TqGCg03ko1cc';
app.use(express.json());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('/notification/:text/:body', (req, res) => {
  const message = {
    notification: {
      title: req.params.text,
      body: req.params.body,
    },
    tokens: [token],
  };

  admin
    .messaging()
    .sendMulticast(message)
    .then(s => {
      res.send({status: 200});
    })
    .catch(e => {
      console.log(e);
      res.send({status: 200});
    });
});

app.post('/call', (req, res) => {
  const message = {
    notification: {
      title: 'JARA',
      body: 'Incomming Call from JARA Admin',
    },
    tokens: [token],
  };

  admin
    .messaging()
    .sendMulticast(message)
    .then(s => {
      res.send({status: 200});
    })
    .catch(err => {
      console.log(err);
      res.send({status: 200});
    });
});

app.get('/', (req, res) => {
  res.send({status: 200});
});
// app.get('/turn-server', (req, res) => {
//   let xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function ($evt) {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       let res = JSON.parse(xhr.responseText);
//       console.log('response: ', res);
//     }
//   };
//   xhr.open('PUT', 'https://global.xirsys.net/_turn/MyFirstApp', true);
//   xhr.setRequestHeader(
//     'Authorization',
//     'Basic emFoaW5hZnNhcjplN2VkZWYyYS1mNDBiLTExZWItOWZlNC0wMjQyYWMxNTAwMDM=',
//   );
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.send(JSON.stringify({format: 'urls'}));
// });

app.listen(5000, () => {
  console.log('surver running.......');
});
