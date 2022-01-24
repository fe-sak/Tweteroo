import express from 'express';
import cors from 'cors';
import findAvatar from './findAvatar.js';

const app = express();

app.use(cors());
app.use(express.json());

let users = [];

let tweets = [];

app.post('/sign-up', (req, res) => {
  if (req.body.username && req.body.avatar) {
    users.push({
      username: req.body.username,
      avatar: req.body.avatar,
    });
    res.status(201).send('OK');
  } else res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
});

app.get('/tweets', (req, res) => {
  let { page } = req.query;
  page = parseInt(page);
  if (page) {
    let tweetsToSend = [...tweets].reverse();

    tweetsToSend = tweetsToSend.splice((page - 1) * 10);
    tweetsToSend = tweetsToSend.slice(0, 10);

    res.send(tweetsToSend);
  } else res.status(400).json({ error: 'Informe uma página válida!' });
});

app.get('/tweets/:username', (req, res) => {
  if (req.params.username) {
    res.send([
      ...tweets.filter((tweet) => tweet.username === req.params.username),
    ]);
  } else res.sendStatus(400);
});

app.post('/tweets', (req, res) => {
  if (req.headers.user && req.body.tweet) {
    tweets.push({
      username: req.headers.user,
      avatar: findAvatar(users, req.headers.user),
      tweet: req.body.tweet,
    });
    res.status(201).send('Ok');
  } else res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
});

app.listen('5000', () => {
  console.log('port 5000 listen');
});
