# bpmn-questionnaire Internationalization with the i18next library

This example showcases internationalization using the i18next internationalization library.

## About

bpmn-questionnaire has a pluggable translator. If no plugin is provided the default language is English. You can provide a translation function when creating an instance of a questionnaire. The function must take a string as input and must return a string. What happens in between is up to you.

Set up the i18next library:

```
i18next.init({
  lng: 'de',
  resources: {
    de: {
      translation: {
        'Start':        'Beginnen',
        'Back':         'Zurück',
        'Skip':         'Überspringen',
        'Check answer': 'Antwort überprüfen',
        'Next':         'Weiter',
        'View results': 'Ergebnisse ansehen',
        'Start over':   'Von vorne beginnen'
      }
    }
  }
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

    // We need to bind
    translator: i18next.t.bind(i18next)
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
