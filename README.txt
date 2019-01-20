# google-font-inliner

google-font-inliner is a JavaScript utility that fetches and encodes a Google font for inlining within JSX. Use cases include inlining a font within an SVG so that text styles are embedded without requiring an external stylesheet.

## Install

`npm install GoogleFontInliner`

## Import Module

```
import GoogleFontInliner from 'google-font-inliner';
```

## Instantiate with Google font font family

```
fontInliner = new GoogleFontInliner('Charm');
```

Alternately, the class accepts a `text` argument to specify which characters to encode.

```
fontInliner = new GoogleFontInliner('Charm', 'example text');
```

## `.style()`

Returns a promise that resolves with the inlined CSS for the initialized font family.

## `.fetchCss()`

Returns a promise that resolves with the response of the Google font API
