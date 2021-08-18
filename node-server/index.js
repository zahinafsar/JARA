const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

var serviceAccount = require('./jara-computers-firebase-adminsdk-fb28n-28db6cc309.json');
const token =
  'frnJdR5pQNawOsprCCmhcJ:APA91bG7po1HR8EeOj0xXJ6c2Etfu49XPR_wJ1j633QhKfhW0J0SkpAVA6SWLnBsh8VK68nCpJb_6f1-BKOtw-AgwV7cv5eCco7Df5jcDF1HHQsvnSAVUG-OePbywDHOJtwnAJNPWKRj';
app.use(express.json());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('/notification', (req, res) => {
  //   console.log(req.body);
  const message = {
    notification: {
      title: 'Test',
      body: 'Test Notification',
    },
    tokens: [token],
  };

  admin
    .messaging()
    .sendMulticast(message)
    .then(res => {
      console.log('send success');
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
app.get('/turn-server', (req, res) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function ($evt) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let res = JSON.parse(xhr.responseText);
      console.log('response: ', res);
    }
  };
  xhr.open('PUT', 'https://global.xirsys.net/_turn/MyFirstApp', true);
  xhr.setRequestHeader(
    'Authorization',
    'Basic emFoaW5hZnNhcjplN2VkZWYyYS1mNDBiLTExZWItOWZlNC0wMjQyYWMxNTAwMDM=',
  );
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({format: 'urls'}));
});

app.listen(5000, () => {
  console.log('surver running.......');
});
