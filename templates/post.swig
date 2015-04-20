{% extends 'layout.swig' %}

{% block content %}
<div class="container">
  <div class="row">
    <div class="col-sm-12">
      <h1>{{ title }}</h1>
      <div class="markdown-body">
        {{ contents | safe }}
      </div>
    </div>
  </div>
</div>
{% endblock %}
