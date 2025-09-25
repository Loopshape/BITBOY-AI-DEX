/**
 * @description loads resources (either CSS or JavaScript) from an array of sources,
 * tracking the number of loaded resources and calling a provided callback function
 * when all resources have been loaded.
 * 
 * @param { array } sources - list of files to load, including CSS and JavaScript
 * files, which are processed by the `loadScript()` and `loadCSS()` functions accordingly.
 * 
 * @param { ‘function’. } callback - function that will be executed once all resources
 * have been loaded, indicating that the loading process has finished successfully.
 * 
 * 		- Type: Function
 * 		- Description: A callback function that is executed when all sources have been
 * loaded. It takes no arguments.
 */
function loadResources(sources, callback) {
    let loadedCount = 0;
    const totalSources = sources.length;

    /**
     * @description loads a script tag in a webpage by creating an HTML element, attaching
     * event listeners, and appending it to the body element. When the script is loaded
     * or the state is 'complete', the function calls a callback function if present.
     * 
     * @param { string } source - URL or script code of the script to be loaded.
     */
    function loadScript(source) {
        const script = document.createElement('script');
        script.src = source;
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                loadedCount++;
                if (loadedCount === totalSources && typeof callback === 'function') {
                    callback();
                }
                script.onload = script.onreadystatechange = null;
            }
        };
        script.onerror = function() {
            console.error('Error loading script: ', source);
            loadedCount++;
            if (loadedCount === totalSources && typeof callback === 'function') {
                callback();
            }
        };
        document.body.appendChild(script);
    }

    /**
     * @description creates a link element in the HTML document's head, sets its `rel`
     * attribute to "stylesheet", and its `href` attribute to the given CSS source. When
     * the linked CSS is loaded or errored, the function increments a count variable,
     * checks if all sources have been loaded, and calls a callback function if applicable.
     * 
     * @param { string } source - URL of the CSS file to be loaded.
     */
    function loadCSS(source) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = source;
        link.onload = function() {
            loadedCount++;
            if (loadedCount === totalSources && typeof callback === 'function') {
                callback();
            }
        };
        link.onerror = function() {
            console.error('Error loading CSS: ', source);
            loadedCount++;
            if (loadedCount === totalSources && typeof callback === 'function') {
                callback();
            }
        };
        document.head.appendChild(link);
    }

    sources.forEach(source => {
        if (source.endsWith('.css')) {
            loadCSS(source);
        } else if (source.endsWith('.js')) {
            loadScript(source);
        } else {
            console.error('Unsupported file type for source: ', source);
            loadedCount++;
            if (loadedCount === totalSources && typeof callback === 'function') {
                callback();
            }
        }
    });
}

/**
 * @description imports and executes a JavaScript module named `app.response.js`,
 * passing the result to a specified handleFunction or logging an error message if necessary.
 */
function executeAppResponse() {
    try {
        // Assuming app.response.js is in the same directory
        import('./app.response.js')
            .then(module => {
                if (typeof module.default === 'function') {
                    const result = module.default();
                    // Assuming you have a function to handle the result
                    handleResult(result);
                } else {
                    console.error('Error: app.response is not a function');
                }
            })
            .catch(error => {
                console.error('Error loading app.response.js: ', error);
            });
    } catch (error) {
        console.error('Error executing app.response: ', error);
    }
}

// Example usage:
const sources = [
    /* SCRIPT section */
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/js/bootstrap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/js/foundation.min.js',
    'https://semantic-ui.com/dist/semantic.min.js',
    'https://ajax.googleapis.com/ajax/libs/angularjs/1.6.5/angular.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
    'https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js',
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js',
    'https://d3js.org/d3.v5.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.16.19/js/uikit.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.sound.min.js',
    'https://unpkg.com/rxjs/bundles/rxjs.umd.min.js',
    /* CSS section */
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.2.3/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.7.5/css/foundation.min.css',
    'https://semantic-ui.com/dist/semantic.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/hint.css/2.7.0/hint.min.css',
    'https://cdn.tailwindcss.com/3.3.1.css',
    'https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/uikit/3.16.19/css/uikit.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
    'https://use.fontawesome.com/releases/v5.8.2/css/all.css'
];

loadResources(sources, function() {
    // All scripts and CSS files have been loaded, execute further actions here
    console.log('All resources loaded successfully.');
    executeAppResponse();
});

/**
 * @description logs the input "result" to the console with a timestamp as the index
 * for the multidimensional array.
 * 
 * @param { uncertain or ambiguous data type, as it is not specified or defined within
 * the context of the given code snippet. } result - value that is stored at the
 * current time stamp in a multidimensional array.
 * 
 * 		- Timestamp: A new date-time stamp in milliseconds, captured using `new Date().getTime()`.
 */
function handleResult(result) {
    // Assuming you want to store the result in a multidimensional array with timestamp as index
    const timestamp = new Date().getTime();
    const indexedResult = { [timestamp]: result };
    console.log('Result:', indexedResult);
}
