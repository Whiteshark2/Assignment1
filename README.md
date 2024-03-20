This project utilizes JWT for user authentication and authorization, providing secure login functionality by issuing tokens containing user identity information.
In this project i have created custom 'protect' middleware for authorization , when we access profile. user can go to profile route only when he is logged in .

Before saving user information in database, i have used bcryptjs to hash the password .

when user sign up using email, his/her detail will be added to database only when he/she verifies her email sent on her mail, for this i used nodemailer and gmail.
for email Verification , i used JWT to generate token for user's email,name,password . once email is verified ,his/her will be signed up.

I have used HTML,CSS to create beautiful email template.
Also , i have dotenv for storing sentive info like ,email,secret token and password.

