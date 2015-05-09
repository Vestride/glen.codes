<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{% block title %}Glen Codes{% endblock %}</title>
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700">
</head>
<body>
  {% include 'header.swig' %}
  <main role="main">
    {% block content %}{% endblock %}
  </main>
  {% include 'footer.swig' %}
  {% if isProduction %}
  <script async src='https://www.google-analytics.com/analytics.js'></script>
  <script>window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;ga('create', 'UA-62748172-1', 'auto');ga('send', 'pageview');</script>
  {% endif %}
  {% block scripts %}{% endblock %}
</body>
</html>
