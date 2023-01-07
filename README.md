# Notification Test Coding Challenge - API Backend

## How to use it

clone the repo

```bash
cd into the folder
npm install
npm run seed
npm run dev
```

## Documentation

https://documenter.getpostman.com/view/250377/2s8Z73yWEG

## Info and Considerations

1. New Channels can be easily created by extending the BaseChannel and implementing a _send method
2. You can also add channels of the same type by passing a different name and options to the constructor, for example:

```ts
const channels = {
  email_main: new EmailChannel('email_main', {...mainSmtpSettings}),
  email_secondary: new EmailChannel('email_secondary', {...secondarySmtpSettings})
} 
```
(this functionality is not implemented in the code, but the architecture permits it)

3. debug npm package is being used instead of a proper logger for the sake of the exercise
4. Testing is not fully covered, some of them depends on the database, I would use a mock database for that in a real project
5. Data validation can be improved, for example, the email channel should validate the email address etc
6. Models and Entities are highly coupled (they are basicly the same thing on this project), this is not ideal, I would probably separate them in a real project
7. Email channel has a hardcoded delay just as example
8. Push Notification also have a hardcoded delay, but it fails on purpose to show the error handling
9. Authorization and authentication are not implemented, to simulate some user requests the userId field is being passed in the request body
10. A job queue would be a good addition to the project, so it could scale better
