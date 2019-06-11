const { ClockifyApi } = require('../dist');
const clockify = new ClockifyApi('YOUR_API_KEY');

clockify.user.get().then(user => {
  console.log(`Hello, ${user.name}`);
});
