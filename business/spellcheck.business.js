const path = require('path');
const SpellChecker = require('simple-spellchecker');

const cleanseWord = Symbol('cleanseWord');
const getDictionary = Symbol('getDictionary');

class SpellcheckBusiness {
  constructor(language) {
    this.language = language;
  }

  async checkMistakes(corpus) {
    const dictionary = await this[getDictionary](); 

    const iterableCorpus = corpus.split(' ').map(w => this[cleanseWord](w));

    const mistakes = [];

    iterableCorpus.map(word => {
      if (word && !dictionary.spellCheck(word)) mistakes.push(word);

      return word;
    });

    return mistakes;
  }

  [cleanseWord](word) {
    return word.replace(/[`~!@#$%^&*()_|+\=?;:",.<>\{\}\[\]\\\/]/gi, '');// .replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
  }

  async [getDictionary]() {
    const appDir = path.dirname(require.main.filename);
    const customDictLanguages = ['pt-br'];
    let folderPath = null;

    if (this.language && customDictLanguages.indexOf(this.language.toLowerCase()) > -1) {
      folderPath = appDir + '/custom-dicts';
    }

    return new Promise((resolve, reject) => {
      SpellChecker.getDictionary(this.language, folderPath, (err, dictionary) => {
        if (err) return reject(err);

        resolve(dictionary);
      });
    });
  }
}

module.exports = SpellcheckBusiness;
