import Tour from '../models/Tour.js'


//create new tour 
export const createTour = async (req, res) => {

    const newTour = new Tour(req.body)


    try {
        const savedTour = await newTour.save()

        res.status(200).json({
            success: true,
            message: 'Successfuly created',
            data: savedTour
        })

    }

    catch (err) {
        res.status(500).json({success :false , message:'Failled to create, Try again' , error:err.message})

    }
}



//update tour
export const ubdateTour = async(req,res) => {
   
   const id = req.params.id
   
    try{

        const updateTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body } , {new:true})

            
        res.status(200).json({
            success: true,
            message: 'Successfuly ubdated',
            data: ubdateTour
        })
        


    }
    catch (err){

        res.status(500).json({
            success :false ,
             message:'Failled to ubdate, Try again' })

    }
}


//deleet tour
export const deleteTour = async(req,res) => {
    const id = req.params.id
   
    try{

        await Tour.findByIdAndDelete
        (id)

            
        res.status(200).json({
            success: true,
            message: 'Successfuly deleted',
            
        })
        


    }
    catch (err){

        res.status(500).json({
            success :false ,
             message:'Failled to delete, Try again' })

    }
}



//get single tour
export const getSingleTour = async(req,res) => {
    const id = req.params.id
   
    try{

        const tour = await Tour.findById(id).populate('reviews')


            
        res.status(200).json({
            success: true,
            message: 'Successfuly fetcheing',
            data:tour
            
        })
        


    }
    catch (err){

        res.status(500).json({
            success :false ,
             message:'not found' })

    }
}


// //get all tour
// export const getAllTour = async(req,res) => {


// //for pagination trqeem 
// const page = parseInt(req.query.page)


// console.log(page);
//     try{


//         const tours =  await Tour
//         .find({})
//         .populate('reviews')
//         .skip(page * 8 )
//         .limit(8)

       
//         res.status(200).json({
//             success: true,
//             count:tours.length,
//             message: 'Successfuly fetcheing all',
//             data:tours
            
//         })
        
//     }
//     catch (err){
//         res.status(500).json({
//             success :false ,
//              message:'not found' })

//     }
// }
// controllers/tourController.js

//get all tours edition
export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page) || 0; // default to 0 if not provided
  const limit = 8;
  const skip = page * limit;

  // فلترة بناء على الـ query params
  const {
    city,
    activityType,
    adventureLevel,
    availableDays,
    guideIncluded,
    mealsIncluded
  } = req.query;

  const filter = {};

  if (city) filter.city = city;
  if (activityType) filter.activityType = { $in: activityType.split(',') };
  if (adventureLevel) filter.adventureLevel = adventureLevel;
  if (availableDays) filter.availableDays = { $in: availableDays.split(',') };
  if (guideIncluded !== undefined) filter.guideIncluded = guideIncluded === 'true';
  if (mealsIncluded !== undefined) filter.mealsIncluded = mealsIncluded === 'true';

  try {
    const tours = await Tour
      .find(filter)
      .populate('reviews')
      .skip(skip)
      .limit(limit);

    const totalCount = await Tour.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: tours.length,
      totalCount, // اجمالي نتائج الفلترة (مهم للباجينايشن)
      message: 'Successfully fetched filtered tours',
      data: tours
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};



//get tour by search 
export const getTourBySearch = async(req,res) => {
    const city = new RegExp(req.query.city, 'i') //here "i " means case
// const distance = parseInt(req.query.distance)
// const maxGroupSize = parseInt(req.query.maxGroupSize)


try{


    // gte means greater than equal
// const tours = await Tour.find({city 
// ,maxGroupSize:{$gte:maxGroupSize}}).populate('reviews')


const tours = await Tour.find({city}).populate('reviews')




res.status(200).json({
    success: true,
    count:tours.length,
    message: 'Successfuly ',
    data:tours
    
})

}
catch (err){
res.status(500).json({
    success :false ,
     message:'not found' })

}


}




//get featured tour
export const getFeaturedTour = async(req,res) => {

    
    
    
        try{
    
    
            const tours =  await Tour
            .find({featured:true}).populate('reviews')
            .limit(8)
    
           
            res.status(200).json({
                success: true,
                message: 'Successfuly fetcheing all',
                data:tours
                
            })
            
        }
        catch (err){
            res.status(500).json({
                success :false ,
                 message:'not found' })
    
        }
    }
    



    //get tour conts
    export const getTourCount = async(req,res) =>{
        try{
const tourCount = await Tour.estimatedDocumentCount()


res.status(200).json({
    success: true,
    data:tourCount
    
})

}
catch (err){
res.status(500).json({
    success :false ,
     message:'not found' })

}

}