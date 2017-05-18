import mainTemplate from './src/templates/main.html!text'
import cardstackTemplate from './src/templates/cardstack.html!text'
import cardTemplate from './src/templates/card.html!text'
import adTemplate from './src/templates/advert.html!text'


import Handlebars from 'handlebars'
import rp from 'request-promise'

Handlebars.registerPartial({
	"cardstack": cardstackTemplate,
	"card": cardTemplate,
	"advert": adTemplate
});

Handlebars.registerHelper({
  'if_eq': function(a, b, opts) {
    if(a === b){
        return opts.fn(this);
    }
    return opts.inverse(this);
  },
	'createAdSlot': function(i, opts){
		if( (i+1)%3 == 0 && i+1 < 9){
			return opts.fn(this);
		}
		return opts.inverse(this);
	}
});

export function render() {
    return rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/19cuqL9sgfjhCiuvy4aTdo_US2Gwl1nuk8eJOz2oJSK4.json',
        // uri: 'https://gdn-cdn.s3.amazonaws.com/2015/05/election/data/mega.json',
        json: true
    }).then((data) => {
			var content = Handlebars.compile( mainTemplate, { commpat: true } );
      return content(data);
    });
}
