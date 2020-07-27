const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Space = require('../models/Space');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
  Space.findAll()
    .then(spaces => {
      if (spaces.length > 0) {
        res.render('spaces', { spaces });
      } else {
        res.render('spaces', { message: 'No Item Available' });
      }
    })
    .catch(err => console.error(err));
});

router.get('/new', (req, res) => res.render('editor'));

router.get('/search', (req, res) => {
  const { term } = req.query;

  Space.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(spaces => res.render('spaces', { spaces, term }))
    .catch(err => console.error(err));
});
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;

  let errors = {};

  if (!title) {
    errors.title = 'Title field is required';
  }
  if (!technologies) {
    errors.technologies = 'Technologies field is required';
  }
  if (!description) {
    errors.description = 'Descripton field is required';
  }
  if (!contact_email) {
    errors.email = 'Email field is required';
  }

  if (Object.entries(errors).length > 0) {
    res.render('editor', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    console.log('budget', )
    if (!budget) {
      budget = 'Unknown';
    } else {
      if (!budget.includes('$')) {
        budget = `$${budget}`;
      }
    }

    technologies = technologies.toLowerCase().replace(/, /g, ',');
    Space.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(space => res.redirect('/spaces'))
      .catch(err => console.error(err));
  }
});
module.exports = router;
