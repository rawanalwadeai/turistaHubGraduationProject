import Cars from '../models/Cars.js'


//to add new car
export const addCar = async (req ,res) => {

    const newCar = new Cars(req.body)


    try{
const savedCar = await newCar.save()

res.status(200).json({
    success: true,
            message: 'Successfuly added',
            data: savedCar
})

    }catch(err){
        res.status(500).json({success :false , message:'Failled to add, Try again ' , error:err.message})

    }
}



// update Car
export const updateCar = async (req ,res) => {

    const id = req.params.id
    
    try{
const updateCar = await Cars.findByIdAndUpdate(id , {$set : req.body} , {new :true})

res.status(200).json({
    success: true,
            message: 'Successfuly updated',
            data: updateCar
})

    }catch(err){
        res.status(500).json({success :false , message:'Failled to update, Try again'})

    }
}


// delete Car
export const deleteCar = async (req ,res) => {

    const id = req.params.id
    
    try{
await Cars.findByIdAndDelete(id)

res.status(200).json({
    success: true,
            message: 'Successfuly deleted',
})

    }catch(err){
        res.status(500).json({success :false , message:'Failled to delete, Try again'})

    }
}


// get single Car
export const getSingleCar = async (req ,res) => {

    const id = req.params.id
    
    try{
const car = await Cars.findById(id).populate('reviews')

res.status(200).json({
    success: true,
            message: 'Successfuly fetching',
            data: car
})

    }catch(err){
        res.status(500).json({success :false , message:'Not found'})

    }
}



//from here not relized ////////////////////////////////////////////

// get All Cars
// export const getAllCar = async(req,res) => {


// //for pagination trqeem 
// const page = parseInt(req.query.page)


// // console.log(page);
//     try{


//         const allCars =  await Cars
//         .find({})
//         .populate('reviews')
//         .skip(page * 8 )
//         .limit(8)

       
//         res.status(200).json({
//             success: true,
//             count:allCars.length,
//             message: 'Successfuly fetcheing all',
//             data:allCars
            
//         })
        
//     }
//     catch (err){
//         res.status(500).json({
//             success :false ,
//              message:'not found' })

//     }
// }

export const getAllCar = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = 8; // ممكن تخليه متغير حسب الطلب

    // بناء شروط الفلترة من الاستعلامات (query)
    const filters = {};

    if (req.query.location) filters.location = req.query.location;
    if (req.query.type) filters.type = req.query.type;
    if (req.query.fuelType) filters.fuelType = req.query.fuelType;
    if (req.query.doors) filters.doors = parseInt(req.query.doors);
    if (req.query.seats) filters.seats = parseInt(req.query.seats);
    if (req.query.transmission) filters.transmission = req.query.transmission;
    if (req.query.condition) filters.condition = req.query.condition;

    if (req.query.rentalPrice) {
      filters.price = { $lte: parseFloat(req.query.rentalPrice) };
    }

    if (req.query.amenities) {
      const amenitiesArray = req.query.amenities.split(',');
      filters.amenities = { $all: amenitiesArray }; // تحتوي على كل القيم
    }

    // إجمالي النتائج لجميع الصفحات
    const totalCount = await Cars.countDocuments(filters);

    // جلب النتائج مع التصفية والباجينايشن
    const allCars = await Cars.find(filters)
      .populate('reviews')
      .skip(page * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalCount,
      message: 'Successfully fetched cars',
      data: allCars,
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cars',
    });
  }
};



//     //get Car conts
    export const getCarCount = async(req,res) =>{
        try{
const CarCount = await Cars.estimatedDocumentCount()


res.status(200).json({
    success: true,
    data:CarCount
    
})

}
catch (err){
res.status(500).json({
    success :false ,
     message:'not found' })

}

}


//get Car by search
