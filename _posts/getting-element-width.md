---
title: Getting the Subpixel Width of an Element
excerpt: There are many ways to retrieve the size dimensions for an element with JavaScript. While working on Shuffle, I needed to get the subpixel width of some elements.
coverImage: null
date: '2015-04-19'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
codepen: true
fileName: getting-element-width.md
---

There are many ways to retrieve the size dimensions for an element with JavaScript. While working on [Shuffle](http://vestride.github.io/Shuffle/), I needed to get the subpixel width of some elements.

### My Favorites

Use the `offsetWidth` property. Chrome was going to implement subpixel precision for `offsetWidth` and other related properties, but they decided ["compat pain outweighs the benefit"](https://code.google.com/p/chromium/issues/detail?id=360889). Similarly, jQuery's `.css()` method does provide subpixel precision. This value also stays the same regardless of any `transform` applied to the element.

Next up: `getBoundingClientRect()`. The rectangle returned has `width` and `height` properties\*. The returned values account for any `transform` on the element. That meant I couldn't use it for Shuffle because it scales elements.

Finally, `getComputedStyle()`. This works great Chrome, Firefox, Safari, but IE<=11 does not include padding and border when box-sizing: border-box is set, requiring a feature test and extra work to add the padding back for IE and other browsers which
follow the W3C spec here.

```js
var HAS_COMPUTED_STYLE = !!window.getComputedStyle;
var getStyles = window.getComputedStyle || function () {};

var COMPUTED_SIZE_INCLUDES_PADDING = (function () {
  if (!HAS_COMPUTED_STYLE) {
    return false;
  }

  var parent = document.body || document.documentElement;
  var e = document.createElement('div');
  e.style.cssText = 'width:10px;padding:2px;' + '-webkit-box-sizing:border-box;box-sizing:border-box;';
  parent.appendChild(e);

  var width = getStyles(e, null).width;
  var ret = width === '10px';

  parent.removeChild(e);

  return ret;
})();
```

This is a feature test which Shuffle uses to determine if padding and borders need to be added to the returned dimension from `getComputedStyle`. First, it checks if the browser has support for `getComputedStyle` and aliases it to a no-op function for IE8. Next, it creates a new div element and appends it to the page with width, padding, and box-sizing. Finally, it calls `getComputedStyle` for the new div and tests its return value.

This is the best way I have found to get subpixel precision width or height of an element using JavaScript which ignores any `transform` style set on the element.

```js
/**
 * Retrieve the computed style for an element, parsed as a float.
 * @param {Element} element Element to get style for.
 * @param {string} style Style property.
 * @param {CSSStyleDeclaration} [styles] Optionally include clean styles to
 *     use instead of asking for them again.
 * @return {number} The parsed computed value or zero if that fails because IE
 *     will return 'auto' when the element doesn't have margins instead of
 *     the computed style.
 */
var getNumberStyle = function (element, style, styles) {
  if (HAS_COMPUTED_STYLE) {
    styles = styles || getStyles(element, null);
    var value = getFloat(styles[style]);

    // Support IE<=11 and W3C spec.
    if (!COMPUTED_SIZE_INCLUDES_PADDING && style === 'width') {
      value +=
        getFloat(styles.paddingLeft) +
        getFloat(styles.paddingRight) +
        getFloat(styles.borderLeftWidth) +
        getFloat(styles.borderRightWidth);
    } else if (!COMPUTED_SIZE_INCLUDES_PADDING && style === 'height') {
      value +=
        getFloat(styles.paddingTop) +
        getFloat(styles.paddingBottom) +
        getFloat(styles.borderTopWidth) +
        getFloat(styles.borderBottomWidth);
    }

    return value;
  } else {
    return getFloat($(element).css(style));
  }
};

var getFloat = function (value) {
  value = parseFloat(value);
  return $.isNumeric(value) ? value : 0;
};
```

First, we check if `getComputedStyle` is available (IE9+). If it's not, fall back to jQuery's `.css()`. Next, we retrieve the float value. Now in IE11 and other browsers which support the W3C spec, `padding` and `border` must be added to the `width` or `height`.

---

## Demo

Here's a codepen demo with it all together. All the code is the same except I've replaced jQuery's `$.isNumeric`. I've made each column `33.33333%` width

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="js,result" data-user="Vestride" data-slug-hash="dobEWJ" data-preview="true" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Getting the subpixel width of an element"><span>See the Pen <a href="https://codepen.io/Vestride/pen/dobEWJ">Getting the subpixel width of an element</a> by Glen Cheney (<a href="https://codepen.io/Vestride">@Vestride</a>) on <a href="https://codepen.io">CodePen</a>.</span></p>

---

\* to support IE8, use the `left` and `right` properties to calculate the width.
