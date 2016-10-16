var unirest = require('unirest');
var fs = require('fs');

var api = function(method, props, options, callback) {
  var login = unirest('POST', 'https://api.storyblok.com/v1/users/login');
  login.type('json');
  login.send(options.auth);
  login.end(function(res) {
    var req = unirest(method, 'https://api.storyblok.com/v1/spaces/' + options.spaceId + '/components');

    req.headers({
      'Authorization': res.body.access_token
    });

    req.type('json');

    if (method == 'GET') {
      req.end(callback)
    } else {
      req.send(props);
      req.end(callback);
    }
  });
}

module.exports = function(opt) {

  switch (opt.action) {
    case 'upload':
      var data = JSON.parse(fs.readFileSync('storyblok_components.json').toString());

      data.components.forEach(function(item) {
        delete item.id;
        delete item.created_at;

        api('POST', {component: item}, opt.options, function(res) {
          if (!res.ok) {
            console.log(res.body);
          } else {
            console.log('component ' + item.name + ' created');
          }
        })
      })
      break;
    case 'download':
      api('GET', null, opt.options, function(res) {
        if (!res.ok) {
          console.log(res.body);
        } else {
          fs.writeFileSync('storyblok_components.json', JSON.stringify(res.body, null, 2));
          console.log('Components downloaded and written to storyblok_components.json');
        }
      })
      break;
  }

}
