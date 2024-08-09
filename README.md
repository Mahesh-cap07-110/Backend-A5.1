# Backend-A5.1
Node.js Validation Middleware

Server Setup: We use Express to create the server and set it to listen on port 3000.
Middleware:

express.json() is used to parse JSON bodies.
validateData is our custom middleware for data validation.


Validation Middleware:

It checks each field in the request body against the specified criteria.
If any field fails validation, it adds a note to the notes array.
If all validations pass, it calls next() to proceed to the route handler.
If any validation fails, it sends a 400 status with the error message and notes.


POST Route:

The route uses the validateData middleware.
If validation passes, it sends a 200 status with the "data received" message.


Error Handling:

We add a global error handler to catch JSON parsing errors, responding with a 400 status and "invalid request body" message.