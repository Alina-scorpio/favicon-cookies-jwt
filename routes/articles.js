const express = require('express');
const router = express.Router();

// Мок дані
const articles = [
  { id: 1, title: 'Article One', content: 'Content of article one.' },
  { id: 2, title: '2 статья', content: 'Текст второй статьи.' }
];

// Список статей
router.get('/', (req, res) => {
  res.render('articles/index.ejs', { articles });
});

// Деталі статті
router.get('/:articleId', (req, res) => {
  const article = articles.find(a => a.id == req.params.articleId);
  if (article) {
    res.render('articles/show.ejs', { article });
  } else {
    res.status(404).send('Article not found');
  }
});

module.exports = router;
