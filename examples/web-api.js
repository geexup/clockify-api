const { ClockifyApi } = require('../dist');
const clockify = new ClockifyApi('YOUR_API_KEY');

// Get current user
clockify.user.get().then(user => {
  // Call WebApi (Global)
  clockify.webApi
    // use current workspace id
    .workspaces(user.activeWorkspace)
    // get timeEntries
    .timeEntries
    // for current user
    .user(user.id)
    // in range of '2019-06-17T00:00:00.000Z' to '2019-06-23T23:59:59.999Z'
    .entriesInRange({ start: '2019-06-17T00:00:00.000Z', end: '2019-06-23T23:59:59.999Z' })
    .then(timeEntries =>
      console.log(
        'You have enries for projects:',
        timeEntries
          // map timeEntiries to project names
          .map(item => item.project.name)
          // filter unique names
          .reduce((acc, item) => acc.includes(item) ? acc : [...acc, item], [])
          // convert to comma-separated string
          .join(', ')
      )
    )
});
