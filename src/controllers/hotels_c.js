

module.exports = class HotelController {
    constructor(hotelService){
        this.hotelService = hotelService
    }

    async getAllHotels(req,res,next) {
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

    async getHotel(req,res,next) {
        try {
            let id  = req.params.id
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

    async createHotel(req,res,next) {
        try {
            let hotelData = req.body;
            let newHotel = await this.hotelService.createHotel(hotelData)
            return res.status(201).json({
                status: "success",
                data: newHotel
            })        
        } catch (error) {
            next(error)
        }
    }

    async updateHotel(req,res,next) {
        try {
            let id  = req.params.id;
            if (id === undefined || id === null) {
                return res.status(400).json({
                    status: "failed",
                    error: "id not specified"
                })                
            };
            let hotelData = req.body;
            let msg = await this.hotelService.updateHotel(id,hotelData)
            return res.status(200).json({
                status: "success",
                data: msg
            })            
        } catch (error) {
            next(error)
        }
    }

    async deleteHotel(req,res,next) {
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
}