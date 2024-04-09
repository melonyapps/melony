const db = async (req, res, next) => {
  const { conn } = req.context;
  const projectId = req.query?.projectId || req.body?.projectId;

  const db = conn.db(projectId);

  req.context = {
    ...req.context,
    db,
  };

  next();
};

module.exports = { db };
