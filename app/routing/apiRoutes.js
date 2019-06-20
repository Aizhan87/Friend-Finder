var friendsArray = require("../data/friends");


module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsArray)
    })

    app.post("/api/friends", function (req, res) {
        var newUser = req.body;
        var bestFriend = {
            name: "",
            photo: "",
            score: Infinity
        }
        for (var i = 0; i < friendsArray.length; i++) {
            var totalDifference = 0;
            var currentFriend = friendsArray[i];

            for (var j = 0; j < currentFriend.scores.length; j++) {
                totalDifference += Math.abs(parseInt(currentFriend.scores[j]) - parseInt(newUser.scores[j]));
            }
            console.log(totalDifference)
            if (totalDifference < bestFriend.score) {
                bestFriend.name = currentFriend.name;
                bestFriend.photo = currentFriend.photo;
                bestFriend.score = totalDifference;
            }
        }
        friendsArray.push(newUser)
        res.json(bestFriend);
    })
};