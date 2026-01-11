const { OpenAI } = require("openai");
const Task = require("../models/Task");
const Project = require("../models/Project");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.taskAIHelper = async (req, res) => {
  try {
    const { taskId, type } = req.body;

    // user from auth middleware
    const user = req.user;

    // subscription check
    if (!["pro", "team"].includes(user.subscriptionPlan)) {
      return res.status(403).json({
        msg: "Upgrade to Pro or Team to use AI Assistance",
      });
    }

    const task = await Task.findByPk(taskId, {
      include: [{ model: Project, attributes: ["name"] }],
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    let prompt = "";

    // Phase 1
    switch (type) {
      case "explain":
        prompt = `Explain this task in simple terms:\nTitle: ${task.title}\nDescription: ${task.description}`;
        break;

      case "rewrite":
        prompt = `Rewrite this task description professionally:\n${task.description}`;
        break;

      case "priority":
        prompt = `Suggest priority (Low, Medium, High) for this task:\n${task.title} - ${task.description}`;
        break;

      case "daily-summary":
        prompt = `Create a short daily summary for this task:\n${task.title} - ${task.description}`;
        break;

      default:
        return res.status(400).json({ msg: "Invalid AI request type" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      aiResult: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ msg: "AI service error" });
  }
};

