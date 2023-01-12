const errorHandler =  (err, req, res, next) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statuCode || 500
    const errMsg = err.message || 'Somting went wrong'
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development'?err.stack : {} 
    }) 
}

module.exports = {
    errorHandler
}