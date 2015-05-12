{% extends 'layout.swig' %}

{% block title %}{{ title }} &ndash; Glen Codes{% endblock %}

{% block open_graph -%}
  <meta property="og:url" content="{{ site.url }}/{{ path }}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="{{ title }}" />
  <meta property="og:description" content="{{ excerpt | striptags }}" />
  {% if og_image %}<meta property="og:image" content="{{ og_image }}" />{% endif %}
{%- endblock -%}

{% block content %}
<article class="post" itemscope itemType="http://schema.org/BlogPosting">
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="post__title" itemprop="headline">{{ title }}</h1>
        <div>
          <p>
            Published&#32;<time datetime="{{ published | date('Y-m-d') }}" itemprop="datePublished">{{ published | date('F j, Y') }}</time>
          </p>
          {% if updated %}
            <p>
              Updated&#32;<time datetime="{{ updated | date('Y-m-d') }}" itemprop="dateModified">{{ updated | date('F j, Y') }}</time>
            </p>
          {% endif %}
          <a class="edit-on-github" href="{{ githubSrc }}src/posts/{{ file_name }}" target="_blank">Edit on GitHub</a>
        </div>
        <div class="markdown-body" itemprop="articleBody">
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
