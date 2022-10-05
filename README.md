# backend
React Backend


Features : 

[ ] Users: Have a role, some roles can access to a backoffice. Control 
access control GET / POST. 
[ ] Events: Being able to list events


Features: 


## NFT 

ITEMS.TYPES = {
    NFT: "NFT"
}

- [GET]`/feed` - Return an array of items (art) to display on a feed page

```json
[
  {
    "id": "ABCDEF01",
    "name": "Cinderella in layers",
    "type": ITEMS.NFT,
    "author": "uberpainter"
  }, {...}
]

```

- [get] /authors - Return an array of authors

```json
[
  {
    "name": "uberpainter",
    "profilePictures": "https://avatar.me",
    "bio": "The pencil's attack"
  },
  {
    ...
  }
]

```

- [GET] /author/${nickname}

```json

{
    "nickname": "uberpainter",
    "artistName": "Uber Painter in the stree",
  "location": "Berlin Area",
  "created": {
      "items": [referenceToItems]
    }
}

```

- [GET] /user/${nickname}

```json

{
    "name": "uberpainter",
    "bio": "The pencil's attack",
    "location": "Berlin Area",
}

```

- [GET] /item/${id} - Return specific item extended data

```json
{
  "id": "ABCDEF01",
  "name": "Cinderella in layers",
  "type": ITEMS.NFT,
  "author": "uberpainter",
  "engagement": {
    "likes": 120,
    "dislikes": 200
    
  },
}

```

So in details, here is about endpoints. 


In the app: 

`const { Account } = require('jmes.js')`
`const account = new Account({mnemonic})`;

- `account.getFeed()` - Returns an array of items (nft,...)

- `account.getAuthor({nickname})`
- `account.getAuthors()`
- `account.getUser({nickname})`

- `account.mintItem(item)` - Allow to create a new item of type NFT.
- `account.getItem({id})` - Allow to get a specific item
- `account.findItem({syntax})` - Allow to find an item by field

I'm working in the implementation of all that and should have something to use tomorrow. 
For your informations, here are the endpoint being used by the app.
