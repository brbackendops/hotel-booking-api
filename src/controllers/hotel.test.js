
const app = require('../app');
const request =  require('supertest');
const HotelService = require('../services/hotels/hotel_serv');
const HotelRepo = require('../repo/hotel_repo');

jest.mock('../services/hotels/hotel_serv');
jest.mock('../repo/hotel_repo');

jest.mock('../middlewares/auth', () => ({
    authenticate: (req,res,next) => {
        req.user = {
            id: 1,
            username: 'jhon doe',
            email: 'jhondoe@gmail.com'
        }
        next()
    }
}));

describe('GET /v1/hotel/:id', () => {

    let mockHotelRepo , mockHotelService , req;
    beforeAll(() => {

        mockHotelRepo = HotelRepo
        mockHotelService = new HotelService(mockHotelRepo);
        req = {
            body: {},
            cookies: {},
        }

    })

    it('should return hotel with given id', async() => {
        const mockHotelData = {
            id: 1,
            name: "something",
            pricePerNigh: 1500,
            adultCount: 2,
            city: "somewhere",
            country: "unknown",
            description: "amazing",
            type: "Tourist",
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        mockHotelRepo.getHotelRepo.mockResolvedValue(mockHotelData)
        mockHotelService.getHotel.mockResolvedValue(mockHotelData)

        const response = await request(app).get("/v1/hotels/1")
                                      .set('Content-Type',"application/json")
                                      .set("Accept","application/json")
                                      .set("Accept-Encoding","gizp");

        expect(response.status).toBe(200);
        
        console.error(mockHotelService.getHotel.calls)
        console.error(response.body)
        expect(mockHotelService.getHotel).toHaveBeenCalled();
        expect(response.body).toEqual({
            status: "success",
            data: mockHotelData
        });

    });

    afterAll(() => {
        jest.resetAllMocks();
    })
})