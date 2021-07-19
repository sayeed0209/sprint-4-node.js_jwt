# sprint-4-node.js_jwt

#### Roll dice game

---

### Tech Stack

---

- Backend
  > Node.js
  > express.js
- Database
  > MONGO_DB
  
-JWT

#### Roll dice

```
npm install -> [install all the dependency]
npm run dev -> [start the server]

```

## Endpoint

---

-POST: / players: create a player.

-PUT / players: changes the player's name

-POST / players / {id} / games /: A specific player rolls the dice.

-DELETE / players / {id} / games: removes player rolls

-GET / players /: returns the list of all players in the system with their average success rate

-GET / players / {id} / games: Returns the list of plays by a player.

-GET / players / ranking: returns the average ranking of all players in the system. That is, the average success rate.

-GET / players / ranking / loser: returns the player with the worst success rate

-GET / players / ranking / winner: returns the player with the worst success rate

Also there is postman collection for each end point inside of controllers/Roll_dice_mongodb.postman_collection
