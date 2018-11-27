# Node Mail List Manager

## A Node.js API for building, managing, and interacting with a mailing list.

---

### *Environmental Variables*

**EMAIL_HOST** - The host for the email address you want to send and test from. Check the transporter.js file for more information.

**EMAIL_ADDRESS** - The email address you want to send and test from.

**EMAIL_PASSWORD** - The password for the email address you want to send and test from.

**ACCESS_PASSWORD** - The password protecting the send, test, and view routes in the API. Make sure it is a strong password that is not easily guessed.

**MONGODB_URI** - Your full MongoDB URI including username and password.

**SERVER_URL** - Required for the unsubscribe link that is automatically generated at the bottom of emails.

---

### *API*

|Endpoint|HTTP Verb|JSON Params|Action|
|:-|:-|:-|:-|
|/subscribe|POST|req.body.email|Creates a document in the "subscribers" collection (will create the collection if it doesn't exist) containing the email and a randomly generated 16 character id.|
|/unsubscribe/:email/:id|GET|N/A|Checks for the existence of a document containing the email and then deletes it if the id in the URL matches the id in the document.|
|/view|POST|req.body.password|View a list of the emails that are subscribed to the mailing list.|
|/send|POST|req.body.password, req.body.subject, req.body.html|Send an email (the content of which goes into req.body.html and subject req.body.subject) to everyone in the mailing list.|
|/test|POST|req.body.password, req.body.email, req.body.subject, req.body.html|Send an email (the content of which goes into req.body.html and subject req.body.subject) to the addresses contained in req.body.email.|

---

### *License*

MIT

---

### *People*

Created and maintained by Ibrahim P.G.

---
