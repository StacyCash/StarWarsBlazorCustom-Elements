// Make sure that we can load _content files from the server where the custom element is hosted
var scriptUrl = document.currentScript.src;
var url = new URL(scriptUrl);
var customElementBaseUrl = url.origin;

const importMap = {
    imports: {
        [`${window.location.origin}/_content/`]: `${customElementBaseUrl}/_content/`,
    }
}

const starWarsApiImportMapJson = JSON.stringify(importMap);
const starwarsapiscriptimportmap = document.createElement('script');
starwarsapiscriptimportmap.type = 'importmap';
starwarsapiscriptimportmap.textContent = starWarsApiImportMapJson;
document.head.appendChild(starwarsapiscriptimportmap);

// Make sure that we can load the blazor.webassembly.js file from the server where the custom element is hosted
var starwarsblazorscript = document.createElement('script');
starwarsblazorscript.src = `${customElementBaseUrl}/_framework/blazor.webassembly.js`;
starwarsblazorscript.type = 'text/javascript';
starwarsblazorscript.setAttribute('AutoStart', 'false');
starwarsblazorscript.onload = function () {
    Blazor.start({
        loadBootResource: function (type, name, defaultUri, integrity) {
            if (type == 'dotnetjs') {
                return `${customElementBaseUrl}/_framework/${name}`;
            } else {
                return fetch(`${customElementBaseUrl}/_framework/${name}`, {
                    cache: 'no-cache',
                    integrity: integrity
                });
            }
        }
    });
};

document.head.appendChild(starwarsblazorscript);