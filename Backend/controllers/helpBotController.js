exports.chatWithBot = async (req, res) => {
  const { message } = req.body;
  const msg = message.toLowerCase();

  let reply =
    "Sorry, I didn’t understand that. Try asking about projects, tasks, or subscriptions ";

  if (msg.includes("create project")) {
    reply = "Go to Dashboard → Projects → Create Project ";
  } else if (msg.includes("add task")) {
    reply = "Open a project → Click Add Task → Save ";
  } else if (msg.includes("subscription")) {
    reply = "Manage your plan from Profile → Subscriptions ";
  }

  res.json({ reply });
};
