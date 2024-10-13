const HotelRepo = require('../repo/hotel_repo')
const HotelServ = require('../services/hotels/hotel_serv')
const HotelCont = require('../controllers/hotels_c')


let hotelServ = new HotelServ(HotelRepo)
let hotelController = new HotelCont(hotelServ)


const hotelRouter = require('express').Router();
const { authenticate } = require('../middlewares/auth')


hotelRouter.route('/').get(authenticate,hotelController.getAllHotels.bind(hotelController))
hotelRouter.route('/:id').get(authenticate,hotelController.getHotel.bind(hotelController))
hotelRouter.route('/').post(authenticate,hotelController.createHotel.bind(hotelController))
hotelRouter.route('/:id').put(authenticate,hotelController.updateHotel.bind(hotelController))
hotelRouter.route('/:id').delete(authenticate,hotelController.deleteHotel.bind(hotelController))



module.exports = hotelRouter;