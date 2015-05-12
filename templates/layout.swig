<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="author" content="Glen Cheney" />
  <meta name="theme-color" content="#3498db">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{% block title %}Glen Codes{% endblock %}</title>
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://fonts.gstatic.com">
  {% if isProduction %}<link rel="dns-prefetch" href="https://www.google-analytics.com">{% endif %}
  {% if isProduction and published %}<link rel="dns-prefetch" href="https://glencodes.disqus.com"></script>{% endif %}
  {% if isProduction and published %}<link rel="dns-prefetch" href="https://a.disquscdn.com"></script>{% endif %}
  {% if codepen %}<link rel="dns-prefetch" href="https://assets.codepen.io"></script>{% endif %}
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400">
  <meta property="og:site_name" content="glen.codes" />
  {% block open_graph %}
  <meta property="og:url" content="{{ site.url }}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Glen Codes" />
  <meta property="og:description" content="{{ site.description }}" />
  {% if site.og_image %}<meta property="og:image" content="{{ site.og_image }}" />{% endif %}
  {%- endblock %}
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
  <link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
  <link rel="manifest" href="/manifest.json">
  <meta name="msapplication-TileColor" content="#2d89ef">
  <meta name="msapplication-TileImage" content="/mstile-144x144.png">
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
