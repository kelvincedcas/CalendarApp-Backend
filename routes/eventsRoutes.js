import { Router } from 'express';
import { jwtCheck } from '../middlewares/jwtCheck.js';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers/eventsController.js';
import { check } from 'express-validator';
import { fieldsCheck } from '../middlewares/fieldsCheck.js';

const router = Router();

router.use(jwtCheck);

router.get(
    '/',
    getEvents
);

router.post(
    '/',
    [ // Middlewares
        check('title', 'The title is required.').not().isEmpty(),
        check('start', 'The start date is required.').isISO8601(),
        check('end', 'The end date is required.').isISO8601(),
        fieldsCheck
    ],
    createEvent
);

router.put(
    '/:id',
    [ // Middlewares
        check('title', 'The title is required.').not().isEmpty(),
        check('start', 'The start date is required.').isISO8601(),
        check('end', 'The end date is required.').isISO8601(),
        fieldsCheck
    ],
    updateEvent
);

router.delete(
    '/:id',
    deleteEvent
);

export default router;