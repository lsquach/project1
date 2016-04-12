function index(req, res) {
  res.json({
    message: "Welcome to 'Did he poop?'",
    documentation_url: "https://github.com/lsquach/project1",
    base_url: "https://shrouded-ridge-63422.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"},
      {method: "GET", path: "/api/dogs", description: "List of all the added dogs"},
      {method: "GET", path: "/api/dogs/:dogId", description: "Shows one dog's profile"},
      {method: "POST", path: "/api/dogs", description: "Add a dog's profile"},
      {method: "DELETE", path: "/api/dogs/:dogId", description: "Remove one dog's profile and all associated activity logs"},
      {method: "PUT", path: "/api/dogs/:dogId", description: "Updates one dog profile"},
      {method: "POST", path: "/api/dogs/:dogId/activitylogs", description: "Add an activity log for a dog"},
      {method: "DELETE", path: "/api/dogs/:dogId/activitylogs/:activityLogId", description: "Deletes one activity log from a dog's profile"},
      {method: "PUT", path: "/api/dogs/:dogId/activitylogs/:activityLogId", description: "Updates an activity log"},
    ]
  });
}

module.exports.index = index;
