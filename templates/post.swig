{% extends 'layout.swig' %}

{% block content %}
<div class="container">
  <div class="row">
    <div class="col-sm-8">
      <h1>{{ title }}</h1>
      {{ contents | safe }}
    </div>
  </div>
</div>
{% endblock %}
