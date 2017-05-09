import mainTemplate from './src/templates/main.html!text'
import cardstackTemplate from './src/templates/cardstack.html!text'
import Mustache from 'mustache'
import rp from 'request-promise'

var partialTemplates = {
	"cardstack": cardstackTemplate
};

export function render() {
    return rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/19cuqL9sgfjhCiuvy4aTdo_US2Gwl1nuk8eJOz2oJSK4.json',
        json: true
    }).then((data) => {
      var html = Mustache.render(mainTemplate, data, partialTemplates);
      return html;
    });
}
