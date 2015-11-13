/**
 * Created by finba on 13/11/2015.
 */
function get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.responseXML);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}
get("ajax/ajax.xml").then(function(xml){
    var demo = document.getElementById("demo");

    var xmlTo = xml.getElementsByTagName("to")[0].childNodes[0].nodeValue,
        xmlFrom = xml.getElementsByTagName("from")[0].childNodes[0].nodeValue,
        xmlHeading = xml.getElementsByTagName("heading")[0].childNodes[0].nodeValue,
        xmlBody = xml.getElementsByTagName("body")[0].childNodes[0].nodeValue;

    var xmlArray = [xmlTo, xmlFrom, xmlHeading, xmlBody];

    xmlArray = xmlArray.join('<br />');
    demo.innerHTML = "<pre>" + xmlArray + "</pre>";
});