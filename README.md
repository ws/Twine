# Twine

Note: This is just an inital commit. It's missing most methods, has no unit tests, and probably contains some broken code.

## FAQ

### Wait... will this let me bypass Vine's 6 second limit?!
No. In fact, it won't even let you upload programatically. I feel that it would both cause a lot of spam and just fill Vine with ads.

### So I can't upload?
Nope. See above.

### What about commenting?
Also no. Because spam.

### User account creation?
Spam.

### Login with Twitter instead of email/password?
Probably. Later.

## How To

Here's some example code... I'm working on actual docs for all the functions, but this should point you in the right direction.

```

var twine = require('twine');
var session = twine({username: 'user@example.com', password: 'example'});

session.on('loggedIn', function(){
	session.getTimeline(function(timeline){
		console.log(timeline);
	})
})

```

## Todo
- Actual documentation
- Unit tests (Mocha)
- Add additional API calls
- Clean up the code