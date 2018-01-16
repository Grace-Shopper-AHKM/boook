const router = require('express').Router();
module.exports = router;

const Order = require('../db/models/order');
const BookOrder = require('../db/models/bookOrder');

router.get('/', (req, res, next) => {
    let genre = req.query.genre;
    if (genre) {
        Book.findAll({
            where: {
                genre
            }
        })
            .then(books => res.json(books))
            .catch(next);
    }   else {
        Book.findAll({})
                .then(books => res.json(books))
                .catch(next);
    }
});

router.post('/add',
  gatekeeperMiddleware.isLoggedIn,
  gatekeeperMiddleware.isAdmin,
  (req, res, next) => {
    Book.create(req.body)
      .then(book => res.status(201).json(book))
      .catch(next);
})

router.put('/:bookId/edit',
  gatekeeperMiddleware.isLoggedIn,
  gatekeeperMiddleware.isAdmin,
  (req, res, next) => {
    Book.findById(Number(req.params.bookId))
      .then(book => book.update(req.body))
      .then(book => res.status(201).json(book))
      .catch(next);
})

router.delete('/:bookId/delete',
  gatekeeperMiddleware.isLoggedIn,
  gatekeeperMiddleware.isAdmin,
  (req, res, next) => {
    Book.findById(Number(req.params.bookId))
      .then(book => book.destroy())
      .then(() => res.sendStatus(204))
      .catch(next);
})

router.get('/:bookId/reviews', (req, res, next) => {
    Review.findAll({
        where: {
            bookId: Number(req.params.bookId)
        },
        include: [{model: User}]
    })
        .then(reviews => res.json(reviews))
        .catch(next);
});

router.get('/:bookId', (req, res, next) => {
    Book.findById(Number(req.params.bookId))
        .then(book => res.json(book))
        .catch(next);
});