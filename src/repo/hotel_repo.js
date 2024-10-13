const Hotel = require('../database/models').Hotels;

class HotelRepository {
    constructor(){
        this.hotel = Hotel;
    }

    async getAllHotelsRepo(next) {
        try {
            let pageSize = 10
            let skip = pageSize * next
            let hotels = await this.hotel.findAll({
                offset: skip,
                limit: pageSize,
                order: [['createdAt','DESC']]
            })
            return hotels
        } catch (error) {
            throw error
        }
    }

    async getHotelRepo(id){
        try {
            let hotel = await this.hotel.findOne({
                where:{
                    id
                }
            })

            if (hotel === null) {
                throw new Error("hotel not found")
            }

            return hotel
        } catch (error) {
            throw error
        }
    }

    async createHotelRepo(data){
        try {
            let new_hotel = await this.hotel.create(data)
            await new_hotel.save()
            return new_hotel
        } catch (error) {
            throw error
        }
    }

    async updateHotelRepo(id,data) {
        try {
            let hotel = await this.getHotel(id)
            console.log(hotel)
            if (hotel === null) throw new Error("hotel not found");
            for (let [key,value] of Object.entries(data)) {
                hotel[key] = value
            }

            await this.hotel.update(hotel,{
                where:{
                    id
                }
            })

            return "updated"
        } catch (error) {
            throw error
        }
    }

    async deleteHotelRepo(id) {
        try {
            await this.hotel.destroy({
                where:{
                    id
                }
            })

            return "deleted"
        } catch (error) {
            throw error
        }
    }
}

module.exports = new HotelRepository()