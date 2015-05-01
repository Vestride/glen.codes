<footer class="page-footer" role="contentinfo">
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <nav class="foot-nav" role="navigation">
          <a class="foot-nav__link" href="https://glencheney.com">
            {%- if published -%}
              {%- include '../assets/pencil.svg' -%}
            {%- else %}
              {%- include '../assets/code.svg' -%}
            {%- endif %} with {% include '../assets/heart.svg' %} by <span class="me">Glen Cheney</span>
          </a>
        </nav>
      </div>
    </div>
  </div>
</footer>
