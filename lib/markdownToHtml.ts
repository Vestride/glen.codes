import MarkdownIt from 'markdown-it';
import refractor from 'refractor';
import rehype from 'rehype';

const md = MarkdownIt({
  html: true,
  highlight(str: string, lang: string) {
    if (lang) {
      const nodes = refractor.highlight(str, lang);
      return `<pre class="language-${lang}"><code>${rehype()
        .stringify({ type: 'root', children: nodes })
        .toString()}</code></pre>`;
    }

    return '';
  },
});

export function markdownToHtml(markdown: string) {
  return md.render(markdown);
}
