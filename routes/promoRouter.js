const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const promoRouter = express.Router();
const Promotions = require('../models/promotions');

promoRouter.use(bodyParser.json());


promoRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
            .then(promotions => {
                res.status = 200;
                res.setHeader('Content-Type', 'apllication/json');
                res.json(promotions);
            }, err => next(err))
            .catch(err => next(err))
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.create(req.body)
            .then(promotion => {
                res.status = 200;
                res.setHeader('Content-Type', 'apllication/json');
                res.json(promotion);
            }, err => next(err))
            .catch(err => next(err))
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.remove({})
            .then(resp => {
                res.status = 200;
                res.setHeader('Content-Type', 'apllication/json');
                res.json(resp);
            }, err => next(err))
            .catch(err => next(err))
    });


promoRouter.route('/:promoId')
    .get((req, res, next) => {
        Promotions.findById(req.params.promoId)
            .then(promotion => {
                res.status = 200;
                res.setHeader('Content-Type', 'apllication/json');
                res.json(promotion);
            }, err => next(err))
            .catch(err => next(err))
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, { $set: req.body }, { new: true })
            .then(promotion => {
                res.status = 200;
                res.setHeader('Content-Type', 'apllication/json');
                res.json(promotion);
            }, err => next(err))
            .catch(err => next(err))
    })
    .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Promotions.findByIdAndDelete(req.params.promoId)
            .then(resp => {
                res.status = 200;
                res.setHeader('Content-Type', 'apllication/json');
                res.json(resp);
            }, err => next(err))
            .catch(err => next(err))
    });

module.exports = promoRouter;