const yup = require('yup');


const hotelSchema = yup.object({
    name: yup.string().required(),
    city: yup.string().required(),
    country: yup.string().required(),
    description: yup.array().of(yup.string()).required(),
    type: yup.string().required(),
    adultCount: yup.number().required(),
    childCount: yup.number().required(),
    facilities: yup.array().of(yup.string()),
    rating: yup.object().shape({
        decimal: yup.number().test(
            'is-decimal',
            'invalid decimal',
            value => (value + "").match(/^\d*\.{1}\d*$/)
        )
    }).required(),
    location: yup.string().required(),
    price_night: yup.object().shape({
        decimal: yup.number().test(
            'is-decimal',
            'invalid decimal',
            value => (value + "").match(/^\d*\.{1}\d*$/)
        )
    }).required(),
    images: yup.array().of(yup.string()),
    new_property: yup.boolean()
})

const hotelUpdateSchema = yup.object({
    name: yup.string(),
    city: yup.string(),
    country: yup.string(),
    description: yup.array().of(yup.string()),
    type: yup.string(),
    adultCount: yup.number(),
    childCount: yup.number(),
    facilities: yup.array().of(yup.string()),
    rating: yup.object().shape({
        decimal: yup.number().test(
            'is-decimal',
            'invalid decimal',
            value => (value + "").match(/^\d*\.{1}\d*$/)
        )
    }),
    location: yup.string(),
    price_night: yup.object().shape({
        decimal: yup.number().test(
            'is-decimal',
            'invalid decimal',
            value => (value + "").match(/^\d*\.{1}\d*$/)
        )
    }),
    images: yup.array().of(yup.string()),
    new_property: yup.boolean()
})


module.exports = {
    hotelSchema,
    hotelUpdateSchema
}