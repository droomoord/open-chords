## This project has just started...

API endpoints:

**GET /users**  
public  
returns all users  
[user.name, user._id]

**POST /users**  
public  
create a new user (register)  
expects: JSON: name (required), email (required), password (required)  
returns the user from database

**POST /users/auth**  
public  
authenticate user (login)  
expects: JSON: email (requiered), password(required)  
returns token  
{accesToken}

**GET /songs**  
public  
returns all songs with (possibly multiple) chord progressions  
[title, artist, user(ref), _id, progressions(refs)]  

**GET /songs/:songID**  
public  
returns a song based on the songID  
{title, artist, user(ref), _id, progressions}  

**POST /songs**  
private  
post a song with a chord progression  
expects: a bearer token in the header, JSON: title, artist, chords, key.root, key.minor(optionial boolean)  
returns the song object and the progression object

**GET /progressions**  
public  
get all the chord progressions  
returns all progressions (no relation to songs, but every song has relations to progressions)

**POST /progressions/:songID**  
private  
add a chord progression to a song with the songID  
expects: a bearer token in the header, JSON: key.root, key.minor(optionial boolean), chords  
returns the song with the progression objects

## 04-05-2020 update:  

**PUT /progressions/:progID**  
private  
edit a chord progression that you created  
expects: a bearer token in the header that stores the same user as the user that is linked to the progID, JSON: key.root, key.minor(optionial boolean), chords.  
returns the updated progression

**DELETE /progressions/:progID/:songID**  
private  
remove a progression, also in the progression array of the song  
expects: a bearer token in the header that stores the same user as the user that is linked to the progID  
returns the updated song

**GET /progressions/:progID**  
public  
get a progression bases on the progID  
returns the progression
    
