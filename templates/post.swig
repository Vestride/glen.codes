<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Hello</title>
  </head>
  <body>
    <h1>{{ title }}</h1>
    <time>{{ date | date('Y-m-d') }}</time>
    {{ contents | safe }}
  </body>
</html>
