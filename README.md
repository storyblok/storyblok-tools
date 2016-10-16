# Usage

Require the storyblok-tools and add tasks in your gulpfile.

```
var storyblokSync = require('storyblok-tools');
```

## Download components

```
gulp.task('storyblok:sync:download', function() {
    return storyblokSync({
      action: 'download',
      options: {
        auth: {email: 'YOUR_EMAIL', password: 'YOUR_PASSWORD'},
        spaceId: 'SPACE_ID'
      }
    });
});
```

## Upload components

```
gulp.task('storyblok:sync:upload', function() {
    return storyblokSync({
      action: 'upload',
      options: {
        auth: {email: 'YOUR_EMAIL', password: 'YOUR_PASSWORD'},
        spaceId: 'SPACE_ID'
      }
    });
});
```