const HttpException = require('../exceptions/exception');

const Hotel = require('../database/models').Hotels;

class HotelRepository {
    constructor(){
        this.hotel = Hotel;
    }

    async getAllHotelsRepo(next) {
        try {
            let limit = 10
            let page = next
            let skip = limit * page
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
            console.log(data)
            let new_hotel = await this.hotel.create(data)
            await new_hotel.save()
            return new_hotel
        } catch (error) {
            throw error
        }
    }

    async updateHotelRepo(id,data) {
        try {
            let hotel = await this.getHotelRepo(id)
            if (hotel === null) throw new Error("hotel not found");
            
            
            for (let [key,value] of Object.entries(data)) {
                if (!hotel.dataValues.hasOwnProperty(key)){
                    throw new HttpException(400,`hotel does not have a field like '${key}'`)
                }
                hotel[key] = value;
            }

            
            await hotel.update(hotel,{
                where:{
                    id
                }
            });

            await hotel.save()

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