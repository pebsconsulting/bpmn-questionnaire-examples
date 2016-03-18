# bpmn-questionnaire Simple Internationalization

This example showcases internationalization using a minimal implementation of a translation library.

## About

bpmn-questionnaire has a pluggable translator. If no plugin is provided the default language is English. You can provide a translation function when creating an instance of a questionnaire. The function must take a string as input and must return a string. What happens in between is up to you.

A really simple implementation of a translation library exposed as a global:

```
var translator = (function() {

  var language,
      resources = {};

  function setLanguage(l) {
    language = l;
  }

  function addLanguage(l, r) {
    resources[l] = r;
  }

  function t(key) {

    if (has(resources, language + '.' + key)) {
      return resources[language][key];
    } else {

      // Fail silently
      return key;
    }
  }

  return {
    setLanguage: setLanguage,
    addLanguage: addLanguage,
    t:           t
  };
}());
```

Configure your translation library:

```
translator.setLanguage('de');
translator.addLanguage('de', {
  'Start':        'Beginnen',
  'Back':         'Zurück',
  'Skip':         'Überspringen',
  'Check answer': 'Antwort überprüfen',
  'Next':         'Weiter',
  'View results': 'Ergebnisse ansehen',
  'Start over':   'Von vorne beginnen'
});
```

Plug into the translator when creating an instance:

```
var q = new BpmnQuestionnaire({
  container: 'container',
  questionnaireJson: questionnaireJson,
  types: {
    single: single
  },
  plugins: {
    translator: translator.t
  }
});
```

That's it. No extra weight if you don't need internationalization.

## Usage Summary

Install dependencies

```
npm install
```

Build the projects

```
grunt build
```

Spin up a server and you're good to go.

## Licence

MIT
