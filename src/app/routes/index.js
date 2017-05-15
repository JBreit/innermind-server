import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => { 
  res.status(200).render('index.ejs', { title: 'Express Babel' });
});

export default router;
