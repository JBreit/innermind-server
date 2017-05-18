exports.index = (req, res) => {
  res.status(200).render('index.ejs', { title: 'Express Babel' });
};