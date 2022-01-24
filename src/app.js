import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

let users = [];
console.log(users);

let tweets = [];

app.post('/sign-up', (req, res) => {
  users.push({
    username: req.body.username,
    avatar: req.body.avatar,
  });

  res.send('OK');
});

app.get('/tweets', (req, res) => {
  let tweetsToSend = tweets.slice(-10);
  tweetsToSend = tweetsToSend.reverse();
  res.send(tweetsToSend);
});

app.post('/tweets', (req, res) => {
  tweets.push({
    username: req.body.username,
    avatar: findAvatar(req.body.username),
    tweet: req.body.tweet,
  });
  res.send('Ok');
});

function findAvatar(username) {
  let avatar;
  users.forEach((user) => {
    if (username === user.username) {
      avatar = user.avatar;
    }
  });
  return avatar;
}

app.listen('5000', () => {
  console.log('port 5000 listen');
});
