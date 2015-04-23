{% extends 'layout.swig' %}

{% block content %}
<div class="container">
  <div class="row">
    <div class="col-sm-8">
      <section class="post-list">
        {% for post in posts %}
          <article>
            <time datetime="{{ post.published | date('Y-m-d') }}">{{ post.published | date('F j, Y') }}</time>
            <h2><a href="/{{ post.path }}/">{{ post.title }}</a></h2>
            {{ post.excerpt | safe }}
          </article>
        {% endfor %}
      </section>
    </div>
  </div>
</div>
{% endblock %}
