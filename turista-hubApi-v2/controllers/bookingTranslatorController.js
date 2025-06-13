import BookingTranslator from '../models//BookingTranslator.js'

import { sendEmail } from '../utils/email.js'





//create new booking 
export const createBooking = async (req , res) =>{
const newBooking = new BookingTranslator(req.body)

    try{
const savedBooking = await newBooking.save()






 await sendEmail( 
      savedBooking.userEmail,
      'Booking Received – Awaiting Payment',
      `Dear ${savedBooking.fullName},\n\nWe have received your booking for the `
    )

    

res.status(200).json({
    success: true,
    message: 'Your tour is booked',
    data: savedBooking
})
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'All fields are required',
            error:err.message
           
        })

    }
}




//get single booking 
export const getBooking = async(req , res) => {
    const  id = req.params.id

    try{
        const book = await BookingTranslator.findById(id)


        res.status(200).json({
            success: true,
            message: 'successful',
            data: book
        })
            }catch(err){
                res.status(500).json({
                    success: false,
                    message: 'not found ',
                   
                })
        
            }
        }
        


        //get all booking 
export const getAllBooking = async(req , res) => {

    try{
        const books = await BookingTranslator.find()


        res.status(200).json({
            success: true,
            message: 'successful',
            data: books
        })
            }catch(err){
                res.status(500).json({
                    success: false,
                    message: ' server error ',
                   
                })
        
            }
        }
        