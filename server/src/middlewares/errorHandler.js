//errorHandler middleware
//this middleware acts as an "error catcher" in Express
//having four parameters (err, req, res, next) is like a special sign
//Express automatically redirects to this function if an error occurs somewhere
export const errorHandler = (err, req, res, next) => {
  //print the error message to the terminal
  console.error("Error middleware:", err.message);

  //we send an error message to the user in JSON format
  //status code is fixed here "500" (Internal Server Error)
  //this means that there is an unexpected error on the server side
  res.status(500).json({
    //error: error message (or default message)
    error: err.message || "Something went wrong",
  });
};
