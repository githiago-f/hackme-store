export const page = (view, data) =>
  (req, res) => res.render(view, {...data, user: req.user });
