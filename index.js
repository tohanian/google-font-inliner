class GoogleFontInliner {
  constructor(fontFamily, text = '') {
    this.fontFamily = fontFamily;
    this.fontUrl = `https://fonts.googleapis.com/css?family=${fontFamily}`;
    this.text = text;
  }

  fetchCss() {
    return fetch(
      `${this.fontUrl}${this.text && `&text=${encodeURIComponent(this.text)}`}`
    )
      .then(function(response) {
        return response.text();
      })
      .catch(function(error) {
        throw error;
      });
  }

  // TODO: error handling
  // TODO: es6 - use babel or write in es5?
  //   > arrow functions
  // TODO: side effect?
  style() {
    return this.fetchCss().then(css => {
      const fontEndpoints = css.match(/https:\/\/[^)]+/g);

      // Promises that resolve as blobs of fonts
      const fontLoadedPromises = fontEndpoints.map(fontEndpoint => {
        return new Promise(function(resolve, reject) {
          fetch(fontEndpoint)
            .then(function(response) {
              return response.blob();
            })
            .then(function(blob) {
              const reader = new FileReader();
              reader.addEventListener('load', function() {
                // Side Effect
                css = css.replace(fontEndpoint, this.result);
                resolve([fontEndpoint, this.result]);
              });
              reader.readAsDataURL(blob);
            })
            .catch(reject);
        });
      });

      return Promise.all(fontLoadedPromises).then(function() {
        return css;
      });
    });
  }
}

export default GoogleFontInliner;
