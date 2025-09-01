
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

import { Event } from '../models/Event.js';


/** @param {Request} req @param {Response} res */
export const getEvents = async (req, res) => {

    const userId = req.id;
    try {
        const events = await Event.find()
                    .where('user')
                    .equals(userId)
                    .populate('user', 'name')

        res.status(200).json({
            ok: true,
            events
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador'
        });
    };
};

/** @param {Request} req @param {Response} res */
export const createEvent = async (req, res) => {

    const event = new Event(req.body);
    const userId = req.id;
    
    try {
        event.user = userId;
        const eventSaved = await event.save();
        return res.status(201).json({
            ok: true,
            msg: 'Successfully create event.',
            eventSaved
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador'
        });
    };

};

/** @param {Request} req @param {Response} res */
export const updateEvent = async (req, res) => {

    const {id} = req.params;
    const userId = req.id;
    try {

        const event = await Event.findById(id);

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no event with that id.'
            });
        };

        if(event.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to perform this action.'
            });
        };

        // Actualizar el evento
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {new: true});
        
        res.status(201).json({
            ok: true,
            msg: 'Successfully updated event.',
            updatedEvent
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador'
        });
    }
};

/** @param {Request} req @param {Response} res */
export const deleteEvent = async (req, res) => {

    const {id} = req.params;
    const userId = req.id;

    try {

        const event = await Event.findById(id);

        if(!event) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no event with that id.'
            });
        };
        
        if(event.user.toString() !== userId) {
            return res.status(401).json({
                ok: false,
                msg: 'You do not have permission to perform this action.'
            });
        };

        await Event.findByIdAndDelete(id);

        res.status(200).json({
            ok: true,
            msg: 'Successfully deleted event.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contactese con el administrador'
        });
    }
};
