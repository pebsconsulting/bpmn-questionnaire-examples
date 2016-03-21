'use strict';

// bpmn-questionnaire
var BpmnQuestionnaire = require('bpmn-questionnaire');

// Types
var single            = require('./types/single.js');

// lodash
var has = require('lodash/has');

// An example plugin that can be used with the translation service
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

// Configure plugin
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

// Spin up the questionnaire
var xhr = new XMLHttpRequest();
var url = "../resources/questionnaire.json";

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var questionnaireJson = JSON.parse(xhr.responseText);

        // Spin up questionnaire
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

    }
};
xhr.open("GET", url, true);
xhr.send();
