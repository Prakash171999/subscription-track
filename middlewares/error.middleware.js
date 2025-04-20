const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err }; // Create a copy of the error object
    error.message = err.message; // Get the error message from Mongoose
    console.error(err);

    //Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new Error(message);
      error.status = 404;
    }

    //Mongoose duplicate key
    if (err.code === 11000) {
      //11000 is the error code for duplicate key
      const message = "Duplicate field value entered";
      error = new Error(message);
      error.status = 400;
    }

    //Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.status = 400;
    }

    //Send response to client with status code and error message
    res.status(error.status || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

export default errorMiddleware;
