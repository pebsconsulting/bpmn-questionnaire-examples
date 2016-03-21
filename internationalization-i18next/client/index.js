'use strict';

// bpmn-questionnaire
var BpmnQuestionnaire = require('bpmn-questionnaire');

// Types
var single            = require('./types/single.js');

// i18next
var i18next           = require('i18next');

// Configure i18next
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

            // We need to bind
            translator: i18next.t.bind(i18next)
          }
        });

    }
};
xhr.open("GET", url, true);
xhr.send();
