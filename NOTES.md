## My Notes

### Introductory notes
- changed to port 7001
- removed jest --watch as I was facing an issue with tests being infinitely looped due to the fact that my afterAll block would edit the directory, sending the loop round again. If I had more time I would have addressed this issue earlier but I chose a short-term fix. 
- changed TypeScript files to JavaScript as I am less familiar with TS. 

### General notes
- Timing myself, I spent 4 hours on the tasks set, not including the time I am taking to add to this notes file
- I completed up to the successful deletion of a card however did not have the time to add sufficient error-handling to this endpoint.
- If I had more time I would have focused more on tidiness and error-handling. For example, I would have split my main test, model and controller files into smaller files focusing on specific endpoints. I would have taken my error handling in server.js and moved it to a seperate 'errors' folder. 
- I also could have tested my utils functions to cover a larger range of possible errors
- As mentioned in my introductory notes, I set up a function to reset the data after every test was complete so that there wasn't any inconsistency when running multiple tests.
- I used different git branches to work on each endpoint before merging to main
- I was slightly confused by the difference between sizes.json and cards.json so treated them both the same and made sure to edit both together when posting or deleting cards. 

### Thank you