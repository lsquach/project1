function index(req, res) {
  res.json({
    message: "Welcome to Did he poop?",
    documentation_url: "http://placeholder.com",
    base_url: "http://placeholder.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
