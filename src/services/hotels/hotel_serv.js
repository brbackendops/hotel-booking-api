
const Stripe = require('stripe');

module.exports = class HotelService {
    constructor(hotelRepo,stripeKey){
        this.hotelRepo = hotelRepo
        this.stripe = new Stripe(stripeKey)
    }

    async getAllHotels(req) {
        try {
            let next = req.query?.next 
            if (next === undefined) next = 0;
            let hotels = this.hotelRepo.getAllHotelsRepo(next)
            return hotels
        } catch (error) {
            throw error
        }
    }

    async getHotel(id){
        try {
            let hotel = await this.hotelRepo.getHotelRepo(id)
            return hotel
        } catch (error) {
            throw error
        }

    }

    async createHotel(data){
        try {
            return this.hotelRepo.createHotelRepo(data)
        } catch (error) {
            throw error
        }
    }

    async updateHotel(id,data){
        try {
            let msg = await this.hotelRepo.updateHotelRepo(id,data)
            return msg + " successfully"
        } catch (error) {
            throw error
        }
    }

    async deleteHotel(id){
        try {
            let msg = await this.hotelRepo.deleteHotelRepo(id)
            return msg + " successfully"
        } catch (error) {
            throw error
        }
    }
}