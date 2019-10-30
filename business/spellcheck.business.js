const SpellChecker = require('simple-spellchecker');

const cleanseWord = Symbol('cleanseWord');

class SpellcheckBusiness {
  constructor(language) {
    this.language = language;
  }

  async checkMistakes(corpus) {
    const dictionary = await new Promise((resolve, reject) => {
        SpellChecker.getDictionary(this.language, (err, dictionary) => {
          if (err) return reject(err);

          resolve(dictionary);
        });
      });

    const iterableCorpus = corpus.split(' ').map(w => this[cleanseWord](w));

    const mistakes = [];

    iterableCorpus.map(word => {
      if (word && !dictionary.spellCheck(word)) mistakes.push(word);

      return word;
    });

    return mistakes;
  }

  [cleanseWord](word) {
    return word.replace(/[`~!@#$%^&*()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi, '');// .replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")
  }
}

module.exports = SpellcheckBusiness;
