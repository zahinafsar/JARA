const admin = require('firebase-admin');
const express = require('express');
const app = express();

var serviceAccount = require('./jara-computers-firebase-adminsdk-fb28n-28db6cc309.json');
const token =
  'fzDawvxMTfKG2U8DLhh6V8:APA91bG-32-y4BswZ8ortp26DvualaXojMkQMR0nUnQLO06coOcE6Y4peBnxgnVBhDyNd5koFnzHDfw-3sA76pCMOBhlPLvxm-8MIa06Cov6XD9N6EBPkJtS9428l3tllppqyLESUySB';
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

app.listen(3000, () => {
  console.log('surver running.......');
});
