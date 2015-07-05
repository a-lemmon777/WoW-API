/**
 * Created by a.lemmon777 on 4/1/2015.
 */

var author = "Aaron Lemmon";
var source = "https://github.com/lemmo031/WoW-API";

exports.getAboutInfo = function(request, response) {
  response.status(200).json({"author": author, "source": source});
};

function handleError(response, err) {
  return response.send(500, err);
}
