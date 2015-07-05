/**
 * Created by a.lemmon777 on 3/29/2015.
 */
 
'use strict';

exports.displayGreeting = function(request, response) {
  response.send('Welcome to the World of Warcraft API!<br>' +
  'Things you can do:<br>' +
  '=============================<br>' +
  'GET {url}/about<br>' +
  'POST {url}/account {\'name\': \'myAccount\'}<br>' +
  'GET {url}/account<br>' +
  'POST {url}/account/{account_name}/characters {\'name\': \'Blackhand\', \'race\': \'Orc\', \'class\': \'Warrior\', \'faction\': \'Horde\', \'level\': 33}<br>' +
  'DELETE {url}/account/{account_name}<br>' +
  'DELETE {url}/account/{account_name}/characters/{character_name}<br>' +
  'GET {url}/account/{account_name}/characters<br>' +
  'PUT {url}/account/{account_name}/characters/{character_name} (used for undeleting a character)<br>' +
  'Enjoy!<br>');
};
