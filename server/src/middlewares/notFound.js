//notFound middleware
//if the user makes a request to a non-defined route (e.g /abc)
//Express runs this middleware last
//purpose: to give "404 not found" response
export const notFound = (req, res, next) => {
  //status code 404 -> soruce not found
  res.status(404).json({
    //error: we use req.originalUrl to show which endpoint was not found
    //e.g : if user wrote "/abc" -> "Not Found - /abc"
    error: `Not Found - ${req.originalUrl}`,
  });
};
