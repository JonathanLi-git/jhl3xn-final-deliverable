Hello Databases faculty. This is my EC milestone.

Summary: 
- I created 2 functionalities, 1. Logging in  and   2. signing up
- Authentication is performed as security measures. This is done through next-auth, an API
  I used to delegate sessions each time a new login is performed. You can see the status after logging in through the web console.


How to demo:
1. It will initially take you to the root. There will be a button. Press that button
2. Create a new user on the right hand side. I didn't implement a recovery system so remember the username and password.
3. Log in with the username and password you created.
4. It should redirect you to another page once a session is established. You can view the status of the sessions in the console.
5. Once in, the big sign out button will end your session and redirect you back to the login page.
