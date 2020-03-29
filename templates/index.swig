{% extends 'layout.swig' %}

{% block content %}
<div class="container">
  <div class="row site-intro">
    <div class="col-sm-10">
      <h1 class="site-intro__title"><span>{{ site.name }}</span></h1>
      <p class="site-intro__description">{{ site.description | safe }}</p>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-4 col-sm-push-8 col-md-3">
      <aside class="about-me module" role="complementary">
        <div class="about-me__photo">
          <div class="aspect">
            <img srcset="/assets/glen-175w.jpg 175w,
              /assets/glen-300w.jpg 300w,
              /assets/glen-400w.jpg 400w,
              /assets/glen-600w.jpg 600w"
              sizes="(min-width: 1290px) 300px, (min-width: 1016px) 22vw, (min-width: 760px) 29vw, 28vw"
              src="/assets/glen-600w.jpg"
              alt="A photo of Glen Cheney smiling while sitting in a restaurant." />
          </div>
        </div>
        <div class="about-me__hello">
          <p class="marginless">Hey, I&rsquo;m <a href="https://glencheney.com">Glen Cheney</a>.</p>
          <p class="marginless">I&rsquo;m a front-end developer at <a href="http://www.lyft.com">Lyft</a> in San Francisco.</p>
          <p class="marginless">You can find me on <a href="https://github.com/Vestride">GitHub</a>, <a href="https://twitter.com/Vestride">Twitter</a>, and <a href="http://codepen.io/Vestride/">CodePen</a> as Vestride.</p>
        </div>
      </aside>
    </div>
    <div class="col-sm-8 col-sm-pull-4 col-md-7 col-md-pull-3">
      <section class="post-list">
        {% for post in posts %}
          <article class="post-list__post module" itemscope itemType="http://schema.org/BlogPosting">
            <h2 class="post-list__post-title" itemprop="headline"><a href="/{{ post.path }}/">{{ post.title }}</a></h2>
            <p><small>Published on&#32;<time datetime="{{ post.published | date('Y-m-d') }}" itemprop="datePublished">{{ post.published | date('F j, Y') }}</time></small></p>
            <div itemprop="description">{{ post.excerpt | safe }}</div>
          </article>
        {% endfor %}
      </section>
    </div>
  </div>
</div>
{% endblock %}
