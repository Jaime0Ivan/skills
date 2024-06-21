/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Bienvenidos a calculadora de jaime';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CalcularIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'calcular';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const operacion = slots.operacion.value.toLowerCase();
        const valorUno = parseFloat(slots.valorUno.value);
        const valorDos = slots.valorDos ? parseFloat(slots.valorDos.value) : undefined;

        const calcularPotencia = (base, exponente) => Math.pow(base, exponente);
        const calcularFactorial = (numero) => {
            if (numero < 0) return undefined;
            if (numero === 0) return 1;
            return numero * calcularFactorial(numero - 1);
        };
        const calcularSeno = (angulo) => Math.sin(angulo * Math.PI / 180);
        const calcularCoseno = (angulo) => Math.cos(angulo * Math.PI / 180);
        const calcularTangente = (angulo) => Math.tan(angulo * Math.PI / 180);

        let resultado;
        let speech;

        try {
            switch (operacion) {
                case 'potencia':
                    if (valorDos !== undefined) {
                        resultado = calcularPotencia(valorUno, valorDos);
                        speech = `${valorUno} elevado a ${valorDos} es ${resultado}`;
                    } else {
                        speech = 'Por favor, proporciona un exponente para calcular la potencia.';
                    }
                    break;
                case 'factorial':
                    resultado = calcularFactorial(valorUno);
                    if (resultado !== undefined) {
                        speech = `El factorial de ${valorUno} es ${resultado}`;
                    } else {
                        speech = 'No se puede calcular el factorial de un número negativo.';
                    }
                    break;
                case 'seno':
                    resultado = calcularSeno(valorUno);
                    speech = `El seno de ${valorUno} grados es ${resultado}`;
                    break;
                case 'coseno':
                    resultado = calcularCoseno(valorUno);
                    speech = `El coseno de ${valorUno} grados es ${resultado}`;
                    break;
                case 'tangente':
                    resultado = calcularTangente(valorUno);
                    speech = `La tangente de ${valorUno} grados es ${resultado}`;
                    break;
                default:
                    speech = 'Operación no reconocida. Por favor, intenta nuevamente.';
                    break;
            }
        } catch (error) {
            speech = 'Lo siento, ocurrió un error al calcular. Por favor, inténtalo de nuevo.';
        }

        return handlerInput.responseBuilder
            .speak(speech)
            .getResponse();
    }
};

const SumaIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SumaIntent';
  },
  handle(handlerInput) {
    const numUno = handlerInput.requestEnvelope.request.intent.slots.numUno.value;
    const numDos = handlerInput.requestEnvelope.request.intent.slots.numDos.value;

    if (!numUno || !numDos) {
      return handlerInput.responseBuilder
        .speak('Por favor, proporciona dos números para sumar.')
        .reprompt('Por favor, proporciona dos números para sumar.')
        .getResponse();
    }

    const suma = parseFloat(numUno) + parseFloat(numDos);

    return handlerInput.responseBuilder
      .speak(`La suma de ${numUno} y ${numDos} es ${suma}.`)
      .getResponse();
  },
};

const RestaIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'RestaIntent';
  },
  handle(handlerInput) {
    const numUno = handlerInput.requestEnvelope.request.intent.slots.numUno.value;
    const numDos = handlerInput.requestEnvelope.request.intent.slots.numDos.value;

    if (!numUno || !numDos) {
      return handlerInput.responseBuilder
        .speak('Por favor, proporciona dos números para restar.')
        .reprompt('Por favor, proporciona dos números para restar.')
        .getResponse();
    }

    const resta = parseFloat(numUno) - parseFloat(numDos);

    return handlerInput.responseBuilder
      .speak(`La resta de ${numUno} y ${numDos} es ${resta}.`)
      .getResponse();
  },
};

const MultiplicacionIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'MultiplicacionIntent';
  },
  handle(handlerInput) {
    const numUno = handlerInput.requestEnvelope.request.intent.slots.numUno.value;
    const numDos = handlerInput.requestEnvelope.request.intent.slots.numDos.value;

    if (!numUno || !numDos) {
      return handlerInput.responseBuilder
        .speak('Por favor, proporciona dos números para multiplicar.')
        .reprompt('Por favor, proporciona dos números para multiplicar.')
        .getResponse();
    }

    const multiplicacion = parseFloat(numUno) * parseFloat(numDos);

    return handlerInput.responseBuilder
      .speak(`La multiplicación de ${numUno} y ${numDos} es ${multiplicacion}.`)
      .getResponse();
  },
};

const DivisionIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'DivisionIntent';
  },
  handle(handlerInput) {
    const numUno = handlerInput.requestEnvelope.request.intent.slots.numUno.value;
    const numDos = handlerInput.requestEnvelope.request.intent.slots.numDos.value;

    if (!numUno || !numDos) {
      return handlerInput.responseBuilder
        .speak('Por favor, proporciona dos números para dividir.')
        .reprompt('Por favor, proporciona dos números para dividir.')
        .getResponse();
    }

    if (parseFloat(numDos) === 0) {
      return handlerInput.responseBuilder
        .speak('No se puede dividir entre cero.')
        .getResponse();
    }

    const division = parseFloat(numUno) / parseFloat(numDos);

    return handlerInput.responseBuilder
      .speak(`La división de ${numUno} entre ${numDos} es ${division}.`)
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        SumaIntentHandler,
        RestaIntentHandler,
        MultiplicacionIntentHandler,
        DivisionIntentHandler,
        CalcularIntentHandler,
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();