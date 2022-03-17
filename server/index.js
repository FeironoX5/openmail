const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const port = 3000;


const Imap = require('imap');
const inspect = require('util').inspect;
var fs = require('fs'), fileStream;

app.post('/api/mails', function (req, res) {
  const imap = new Imap({
    user: req.body.email,
    password: req.body.password,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: {rejectUnauthorized: false}
  });
  console.log(req.body.email + ' connecting with ' + req.body.password);
  imap.once('ready', function () {
    console.log(req.body.email + ' connected');
    imap.openBox('INBOX', true, function (err, box) {
      const f = imap.seq.fetch('1:3', {
        bodies: ['TEXT'],
        struct: true
      });
      let messages = ['', '', ''];
      f.on('message', function (msg, seqno) {
        msg.on('body', function (stream, info) {
          let buffer = '';
          stream.on('data', function (chunk) {
            buffer += chunk.toString('utf8');
          });
          stream.once('end', function () {
            messages[seqno - 1] += buffer;
            console.log(seqno + ' - Parsed header: %s', buffer);
          });
        });
      });
      f.once('end', function () {
        res.json({messages: messages});
        imap.end();
      });
    });
  });
  imap.connect();
});


// app.post('/api/mailsByFolderURL', function (req, res) {
// const client = inbox.createConnection(false, "imap.gmail.com", {
//   secureConnection: true, auth: {
//     user: req.body.email, pass: req.body.password
//   }
// });
// client.connect();
// client.on("error", function (err) {
//   res.json({authenticated: false, error: err});
// });
// client.on("connect", function () {
//   client.openMailbox(req.body.url, function (error, info) {
//     client.listMessages(-10, 50, function (err, messages) {
//       res.json({authenticated: true, inbox: messages.reverse()});
//     });
//   });
// });
// });
//
// app.post('/api/mailByUID', function (req, res) {
// const client = inbox.createConnection(false, "imap.gmail.com", {
//   secureConnection: true, auth: {
//     user: req.body.email, pass: req.body.password
//   }
// });
// client.connect();
// client.on("error", function (err) {
//   res.json({authenticated: false, error: err});
// });
// client.on("connect", function () {
//   client.openMailbox(req.body.url, async function (error, info) {
//     client.fetchData(req.body.uid, function (error, value) {
//       const info = value;
//     });
//
//     function getMailContent() {
//       const stream = client.createMessageStream(req.body.uid);
//       const chunks = [];
//       return new Promise((resolve, reject) => {
//         stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
//         stream.on('error', (err) => reject(err));
//         stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
//       });
//     }
//
//     res.json({authenticated: true, info: info, content: await getMailContent()});
//   })
// });
// });

app.listen(port, () => {
  console.log('Server started! At http://localhost:' + port);
});
