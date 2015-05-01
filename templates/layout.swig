<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{% block title %}Glen Codes{% endblock %}</title>
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700">
  {% include "./smile.swig" %}
</head>
<body>
  {% include 'header.swig' %}
  <main role="main">
    {% block content %}{% endblock %}
  </main>
  {% include 'footer.swig' %}
  {% block scripts %}{% endblock %}
</body>
</html>
