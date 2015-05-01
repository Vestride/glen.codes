{% extends 'layout.swig' %}

{% block content %}
<article class="post">
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="post__title">{{ title }}</h1>
        <div>
          <p>
            Published <time datetime="{{ published | date('Y-m-d') }}">{{ published | date('F j, Y') }}</time>
          </p>
          {% if updated %}
            <p>
              Updated <time datetime="{{ updated | date('Y-m-d') }}">{{ updated | date('F j, Y') }}</time>
            </p>
          {% endif %}
          <a class="edit-on-github" href="{{ githubSrc }}src/posts/{{ file_name }}" target="_blank">Edit on GitHub</a>
        </div>
        <div class="markdown-body">
          {{ contents | safe }}
        </div>
      </div>
    </div>
  </div>
</article>

<div class="container">
  <div class="row">
    <div class="col-sm-12">
      <div id="disqus_thread"></div>
      <noscript>Enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
    </div>
  </div>
</div>
{% endblock %}

{% block scripts %}
  {% if isProduction %}<script async src="https://glencodes.disqus.com/embed.js"></script>{% endif %}
  {% if codepen %}<script async src="https://assets.codepen.io/assets/embed/ei.js"></script>{% endif %}
{% endblock %}
