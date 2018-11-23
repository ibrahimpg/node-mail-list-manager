# Node.js Email Form Handler

A Node.js API for collecting emails in order to build a mailing list as well as allowing for easy unsubscribing by following a link.

### Coming soon

* Endpoint for getting a comma-separated string of all emails in the database provided req.params.password === process.env.PASSWORD

* Endpoint for sending out an email to all subscribers using Nodemailer provided req.body.password === process.env.PASSWORD (and all other requisite data to send stuff via Nodemailer is present ie: valid email and password).

### API

|Endpoint|HTTP Verb|JSON Params|Action|
|:-|:-|:-|:-|
|/subscribe|POST|req.body.email|Creates a document in the "subscribers" collection (will create the collection if it doesn't exist) containing the email and a randomly generated 10 character _id. Will respond with a 400 status if the email already exists in the database and will not create a duplicate document.|
|/unsubscribe/:email/:id|GET|N/A|Checks for the existence of a document containing the email and then deletes it if the id in the URL matches the id in the document.|
