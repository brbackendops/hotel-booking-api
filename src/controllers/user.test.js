const request =  require('supertest')
const app = require('../app')
const userRepo = require('../repo/user_repo')
const userServ = require('../services/user/user_serv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// mock the repo


jest.mock('../repo/user_repo')
jest.mock('../services/user/user_serv')
jest.mock('bcrypt')
jest.mock('jsonwebtoken')


// functional test

describe('POST /v1/users/create', () => {
    let mockUserRepo;
    let mockUserServ;
    let req , res;

    beforeAll(() => {
       console.log("started....!");

       mockUserRepo = {
            getUser: jest.fn(),
            register: jest.fn(),
       };
       mockUserServ = new userServ(mockUserRepo);
       req = {
        body: {}
       }
    });

    it("should create a user with 201 status", async() => {
        const startTime = Date.now()
        req.body = {
            "firstName": "john_doe",
            "lastName": "doe@123",
            "email": "johndoe@example.com",
            "password": "password123"
        };

        const mockedUser = {
            id: 1,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        mockUserRepo.getUser.mockResolvedValue(null);
        mockUserRepo.register.mockResolvedValue(mockedUser);        
        bcrypt.hashSync.mockReturnValue(req.body.password);
        // mockUserServ.registerService = jest.fn().mockResolvedValue({
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
        //     email: req.body.email,
        // })

        let response = await request(app)
        .post("/v1/users/create")
        .send(req.body)
        .set("Content-Type","application/json")
        .set("Accept","application/json")
        .set('Accept-Encoding','gzip');
        
        expect(response.status).toBe(201);
        // expect(response.body).toEqual({
        //     status: "success",
        // });
        
        const endTime = Date.now()
        const responseTime = endTime - startTime;                        
        
        expect(responseTime).toBeLessThan(200);
    })

    afterAll(() => {
        console.log("ended....!");
        jest.resetAllMocks();
    });    
});


describe('POST /v1/users/login', () => {
    let mockUserRepo;
    let mockUserServ;
    let req , res;
    beforeAll(() => {
        mockUserRepo = new userRepo();
        mockUserServ = new userServ(mockUserRepo);
        req = {
            body:{},
        }
        res = {
            cookie: jest.fn(),
        }
    });

    it("should log in successfully with valid credentials", async() => {
        let mockUser = {
            "firstName": "john",
            "lastName": "doe",
            "email": "johndoe@example.com",
            "password": "password123"
        };

        req.body = {
            "email": "johndoe@example.com",
            "password": "assword123"
        };

        const returnMessage = {
            "status": "success",
            "message": "user loggedIn successfully"            
        }

        mockUserRepo.getUser = jest.fn().mockResolvedValue(mockUser);
        bcrypt.compareSync.mockReturnValue(true);
        jwt.sign.mockReturnValue('mocked.jwt.token')
        mockUserServ.loginService = jest.fn().mockResolvedValue(returnMessage);

        const response = await request(app)
                                    .post("/v1/users/login")
                                    .send(req.body)
                                    .set('Content-Type','application/json')
                                    .set('Accept','application/json')
                                    .set('Accept-Encoding','gzip');
        
        expect(response.status).toBe(200);
        //expect(mockUserRepo.getUser).toHaveBeenCalledWith(req.body.email);
        // expect(bcrypt.compareSync).toHaveBeenCalledWith(req.body.email,mockUser.password)
        // expect(mockUserServ.loginService).toHaveBeenCalledWith(req,res)
    })

    afterAll(() => {
        jest.resetAllMocks();
    });

});