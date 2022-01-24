export default function findAvatar(users, username) {
  let avatar;
  users.forEach((user) => {
    if (username === user.username) {
      avatar = user.avatar;
    }
  });
  return avatar;
}
