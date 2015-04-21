{% extends 'layout.swig' %}

{% block content %}
<article class="container">
  <div class="row">
    <div class="col-sm-12">
      <h1>{{ title }}</h1>
      <div class="markdown-body">
        {{ contents | safe }}
      </div>
    </div>
  </div>
</article>
{% endblock %}

{% block scripts %}
  {% if codepen %}<script async src="https://assets.codepen.io/assets/embed/ei.js"></script>{% endif %}
{% endblock %}
