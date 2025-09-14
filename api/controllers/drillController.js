const Drill = require("../models/Drill");

let drillsCache = null;
let cacheTimestamp = 0;

exports.listDrills = async (req, res) => {
  const now = Date.now();

  if (drillsCache && now - cacheTimestamp < 60 * 1000) {
    return res.json(drillsCache);
  }

  const drills = await Drill.find();
  drillsCache = drills;
  cacheTimestamp = now;

  res.json(drills);
};

exports.getDrill = async (req, res) => {
  const drill = await Drill.findById(req.params.id);
  if (!drill) return res.status(404).json({ error: "Not found" });
  res.json(drill);
};
