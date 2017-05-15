import mainTemplate from './src/templates/main.html!text'
import cardstackTemplate from './src/templates/cardstack.html!text'
import cardTemplate from './src/templates/card.html!text'

import Mustache from 'mustache'
import rp from 'request-promise'

var partialTemplates = {
	"cardstack": cardstackTemplate,
	"card": cardTemplate
};

export function render() {
    return rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/19cuqL9sgfjhCiuvy4aTdo_US2Gwl1nuk8eJOz2oJSK4.json',
        // uri: 'https://gdn-cdn.s3.amazonaws.com/2015/05/election/data/mega.json',
        json: true
    }).then((data) => {
      var html = Mustache.render(mainTemplate, data, partialTemplates);
      return html;
    });
}
