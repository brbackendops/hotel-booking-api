const HttpException = require('../exceptions/exception')
const Bookings = require('../database/models').Bookings;

module.exports = class HotelController {
    constructor(hotelService) {
        this.hotelService = hotelService
    }

    async getAllHotels(req, res, next) {
        try {
            let hotels = await this.hotelService.getAllHotels(req)
            return res.status(200).json({
                status: "success",
                data: hotels
            })
        } catch (error) {
            next(error)
        }
    }

    async getHotel(req, res, next) {
        try {
            let id = req.params.id
            if (id === undefined || id === null) throw new Error("id not specified");
            let hotel = await this.hotelService.getHotel(id)
            return res.status(200).json({
                status: "success",
                data: hotel
            })
        } catch (error) {
            next(error)
        }
    }

    async createHotel(req, res, next) {
        try {            
            let hotelData = req.body;
            let newHotel = await this.hotelService.createHotel({userId: req.user.id , ...hotelData})
            return res.status(201).json({
                status: "success",
                data: newHotel
            })
        } catch (error) {
            next(error)
        }
    }

    async updateHotel(req, res, next) {
        try {
            let id = req.params.id;
            if (id === undefined || id === null) {
                return res.status(400).json({
                    status: "failed",
                    error: "id not specified"
                })
            };
            let hotelData = req.body;
            
            let msg = await this.hotelService.updateHotel(id, hotelData)
            return res.status(200).json({
                status: "success",
                data: msg
            })
        } catch (error) {
            next(error)
        }
    }

    async deleteHotel(req, res, next) {
        try {
            let id = req.params.id;
            if (id === undefined || id === null) {
                return res.status(400).json({
                    status: "failed",
                    error: "id not specified"
                })
            };
            let msg = await this.hotelService.deleteHotel(id)
            return res.status(200).json({
                status: "success",
                data: msg
            })
        } catch (error) {
            next(error)
        }
    }

    async bookHotel(req, res, next) {
        try {
            // hotelid , userid , number of nights
            const {
                numberOfNights,
                adultCount,
                childCount,
                checkOut
            } = req.body;
            const hotelId = req.params.hotelId;

            for (let key of Object.keys(req.body)) {
                if (req.body[key] === null || req.body[key] === undefined) {
                    throw new HttpException(400, `${key} must be defined`);
                }
            }



            if (!hotelId) throw new HttpException("hotel id not found", 400);

            const hotel = await this.hotelService.getHotel()
            if (!hotel) throw new HttpException("hotel not found", 400);

            const totalCost = hotel.pricePerNigh * numberOfNights

            const payment = await this.hotelService.stripe.paymentIntents.create({
                amount: totalCost,
                currency: "INR",
                metadata: {
                    hotelId,
                    userId: req.user.id,
                    adultCount,
                    childCount,
                    checkIn: new Date(checkIn),
                    checkOut: new Date(checkOut)
                }
            });

            if (!payment.client_secret) throw new Error("Error Creating Payment Intent");

            const response = {
                paymentIntentId: payment.id,
                clientSecret: payment.client_secret.toString(),
                totalCost,
            }

            return res.status(201).json(response)

        } catch (error) {
            next(error)
        }
    }

    async hotelBookings(req, res, next) {
        try {
            // /:hotelId/verify-booking
            const hotelId = req.params.id

            const paymentIntentId = req.body.paymentIntentId;

            const paymentIntent = await this.hotelService.stripe.paymentIntents.retrieve(
                paymentIntentId.toString()
            )

            if (!paymentIntent) {
                throw new HttpException(400, "payment intent not found");
            }

            if (
                paymentIntent.metadata.hotelId !== hotelId ||
                paymentIntent.metadata.userId !== req.user.id
            ) {
                throw new HttpException(400, "payment intent mismatch");
            }

            if (paymentIntent.status !== "succeeded") {
                throw new HttpException(
                    400,
                    "payment intent not succeeded"
                )
            }

            const newBooking = {
                userId: req.user.id,
                hotelId: hotelId,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                ...req.body,
            };

            const booking = await Bookings.create(newBooking);
            await booking.save()

            return res.status(201).json({
                status: "success",
                message: `your booking for hotelid ${hotelId} was successfull`,
                data: booking
            })
        } catch (error) {
            next(error)
        }
    }
}

/**
 * 13.33.32
 * id
 * userId
 * firstName
 * lastName
 * email
 * adultCount
 * childCount
 * checkIn
 * checkOut
 * totalCost
 */