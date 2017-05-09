import mainTemplate from './src/templates/main.html!text'
//import headerTemplate from './src/templates/header.html!text'
import Mustache from 'mustache'
import rp from 'request-promise'

var partialTemplates = {
	//"header": headerTemplate
};

export function render() {
    return rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/1vXN9tAzU2_UQUulBW3UMAyNtBfI4fj23csgteZEQYF4.json',
        json: true
    }).then((data) => {
      //console.log(data.sheets.Sheet1)
      var d = groupBy(data.sheets.Sheet1, 'Area');
      
      var html = Mustache.render(mainTemplate, {topics: d}, partialTemplates);
      return html;
    });
}

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
