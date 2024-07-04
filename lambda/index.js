/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Welcome, you can say Describe what San Felipe Orizatlán is like or Help. Which one would you like to try?',
            HELLO_MESSAGE: 'Hello!, I hope you enjoy this skill',
            HELP_MESSAGE: 'You can ask me something like "What is the typical food of San Felipe Orizatlán?" How can I help you?',
            CONTINUE_MESSAGE:'... If you want to continue "What is the typical music in San Felipe Orizatlán?"',
            GOODBYE_MESSAGE: 'Bye, thank you for using Angel\'s ability!',
            REFLECTOR_MESSAGE: 'You just triggered %s',
            FALLBACK_MESSAGE: 'Sorry, I don\'t know about that :(. Please try again.',
            ERROR_MESSAGE: 'Sorry, there was an error :/. Please try again.',
            DESCRIPTIONS: [
                'San Felipe Orizatlán is known for its beautiful landscapes and rich culture.',
                'This place is famous for its cultural festivals and welcoming community.',
                'People visit San Felipe Orizatlán for its delicious food and stunning views.',
                'San Felipe Orizatlán offers a unique experience with its rich history and living traditions.'
            ],
            LUGARES_MESSAGE: 'You can visit very beautiful places in San Felipe Orizatlán and do different activities, such as swimming in the Dam, camping in the Encinal cabins, swimming next to the Tultitlán waterfall, visiting Rancho Tuzuntla or hiking in the famous Cerro de Talol',
            COMIDA_MESSAGE: 'When you visit San Felipe Orizatlán, you can try the delicious traditionally made bread, the delicious Enchiladas, delicious Tamales, among other typical foods of the region.',
            MUSICA_MESSAGE: 'In San Felipe Orizatlán the typical music is the huapangos, a singing band, among others.',

        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: 'Bienvenido, puedes decir Describe como es San Felipe Orizatlán o Ayuda. ¿Cuál te gustaría probar?',
            HELP_MESSAGE: 'Puedes preguntarme algo como "¿Cuál es la comida típica de San Felipe Orizatlán?". ¿Cómo te puedo ayudar?',
            CONTINUE_MESSAGE:'... Si quieres contiuar pureba decir "¿Cuál es la música típica en San Felipe Orizatlán?"',
            HELLO_MESSAGE: '¡Holaaa!, Espero que disfrutes esta skill',
            GOODBYE_MESSAGE: '¡Adiós, gracias por usar la habilidad de Angel!',
            REFLECTOR_MESSAGE: 'Acabas de activar %s',
            FALLBACK_MESSAGE: 'Lo siento, no sé sobre eso :(. Por favor, inténtalo de nuevo.',
            ERROR_MESSAGE: 'Lo siento, hubo un error :/. Por favor, inténtalo de nuevo.',
            DESCRIPTIONS: [
                'San Felipe Orizatlán es conocido por su bella naturaleza y cultura rica.',
                'Este lugar es famoso por sus festivales culturales y su comunidad acogedora.',
                'La gente visita San Felipe Orizatlán por su comida deliciosa y sus paisajes impresionantes.',
                'San Felipe Orizatlán ofrece una experiencia única con su historia rica y tradiciones vivas.'
            ],
            LUGARES_MESSAGE: 'Puedes visitar lugares muy bonitos en San Felipe Orizatlán y hacer diferentes actividades, como por ejemplo, nadar en la Presa, acampar en las cabañas del Encinal, nadar junto a la cascada de Tultitlán, visitar el Rancho Tuzuntla o hacer senderismo en el famoso Cerro de Talol',
            COMIDA_MESSAGE: 'Cuando visites San Felipe Orizatlán, puedes probar el rico Pan hecho tradicionalmente, las deliciosas Enchiladas, riquisimos Tamales, entre otras comidas típicas de la región',
            MUSICA_MESSAGE: 'En San Felipe Orizatlán la música típica son los huapangos, banda de viendo, entre otros',
        }
    }
};

//APL BIENVENIDA

const DOCUMENT_ID = "BienvenidaApl";

const datasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://www.orizatlan.com/img/turismo/tradiciones-san-pelipe-orizatlan-01.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Bienvenido, puedes decir Describe como es San Felipe Orizatlán o Ayuda. ¿Cuál te gustaría probar?"
                }
            },
            "logoUrl": "https://static.vecteezy.com/system/resources/previews/017/208/981/original/al-logo-monogram-letter-al-logo-design-al-letter-logo-design-vector.jpg",
            "hintText": "Desarrollador: Ángel de Jesús Lara Barrera"
        }
    }
};

const createDirectivePayload = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            
            const aplDirective = createDirectivePayload(DOCUMENT_ID, datasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//APL HOLA

const DOCUMENT_ID2 = "HolaApl";

const datasource2 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://pbs.twimg.com/media/EIZqS3RW4AALmDx.jpg:large",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "¡Holaaa!, Espero que disfrutes esta skill"
                }
            },
            "logoUrl": "https://static.vecteezy.com/system/resources/previews/017/208/981/original/al-logo-monogram-letter-al-logo-design-al-letter-logo-design-vector.jpg",
            "hintText": "Desarrollador: Ángel de Jesús Lara Barrera"
        }
    }
};

const createDirectivePayload2 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload2(DOCUMENT_ID2, datasource2);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

//AYUDA APL 

const DOCUMENT_ID3 = "AyudaApl";

const datasource3 = {
    "textListData": {
        "type": "object",
        "objectId": "textListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://upload.wikimedia.org/wikipedia/commons/0/09/Presid_orizatlan.JPG",
                    "size": "large"
                }
            ]
        },
        "title": "Preguntas que puedes hacerme",
        "listItems": [
            {
                "primaryText": "Describe como es San Felipe Orizatlán"
            },
            {
                "primaryText": "¿Cuáles son los lugares turísticos en San Felipe Orizatlán?"
            },
            {
                "primaryText": "¿Cuál es la comida típica de San Felipe Orizatlán?"
            },
            {
                "primaryText": "¿Cuáles son los trajes típicos de San Felipe Orizatlán?"
            },
            {
                "primaryText": "¿Quiénes son algunos personajes sobresalientes en San Felipe Orizatlán? "
            },
            {
                "primaryText": "¿Cuál es la música típica en San Felipe Orizatlán?"
            }
        ],
        "logoUrl": "https://static.vecteezy.com/system/resources/previews/017/208/981/original/al-logo-monogram-letter-al-logo-design-al-letter-logo-design-vector.jpg"
    }
};

const createDirectivePayload3 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload3(DOCUMENT_ID3, datasource3);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//CANCELAR APL 

const DOCUMENT_ID4 = "CancelarApl";

const datasource4 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://airesdehidalgo.com/wp-content/uploads/2022/11/81044657_2608139542610504_683661873291198464_n.jpeg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "¡Espero que te haya gustado esta skill, vuelve pronto!"
                }
            },
            "logoUrl": "https://static.vecteezy.com/system/resources/previews/017/208/981/original/al-logo-monogram-letter-al-logo-design-al-letter-logo-design-vector.jpg",
            "hintText": "Desarrollador: Ángel de Jesús Lara Barrera"
        }
    }
};

const createDirectivePayload4 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload4(DOCUMENT_ID4, datasource4);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);   
        }
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
 
//FallbackApl

const DOCUMENT_ID6 = "FallbackApl";

const datasource6 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://i.ytimg.com/vi/SKMh_w14NzE/maxresdefault.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Lo siento, no sé sobre eso. Por favor, inténtalo de nuevo."
                }
            },
            "logoUrl": "https://static.vecteezy.com/system/resources/previews/017/208/981/original/al-logo-monogram-letter-al-logo-design-al-letter-logo-design-vector.jpg",
            "hintText": "Desarrollador: Ángel de Jesús Lara Barrera"
        }
    }
};

const createDirectivePayload6 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload6(DOCUMENT_ID6, datasource6);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
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
 
//ErrorApl
 
const DOCUMENT_ID5 = "ErrorApl";

const datasource5 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://enews.mx/foto/noticias/noticias_20221016120649_1669.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "¡Hola!, parece que algo salió mal, por favor vuelve a intentarlo"
                }
            },
            "logoUrl": "https://static.vecteezy.com/system/resources/previews/017/208/981/original/al-logo-monogram-letter-al-logo-design-al-letter-logo-design-vector.jpg",
            "hintText": "Desarrollador: Ángel de Jesús Lara Barrera"
        }
    }
};

const createDirectivePayload5 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload5(DOCUMENT_ID5, datasource5);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//APL DESCRIPCION

const DOCUMENT_IDDesc = "DescripcionApl";

const datasourceDesc = {
    "videoPlayerTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://www.orizatlan.com/img/turismo/tradiciones-san-pelipe-orizatlan-01.jpg",
            "displayFullscreen": false,
            "headerTitle": "San Felipe Orizatlán",
            "headerSubtitle": "¡Conoce este hermoso lugar!",
            "logoUrl": "https://static.vecteezy.com/system/resources/previews/017/208/981/original/al-logo-monogram-letter-al-logo-design-al-letter-logo-design-vector.jpg",
            "videoControlType": "jump10",
            "videoSources": [
                "https://descripcion-sanfe.s3.us-east-2.amazonaws.com/San_Felipe_Orizatlan.mp4"
            ],
            "sliderType": "determinate"
        }
    }
};

const createDirectivePayloadDesc = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const DescripcionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DescripcionIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const descriptions = requestAttributes.t('DESCRIPTIONS');
        const descriptionIndex = Math.floor(Math.random() * descriptions.length);
        const speakOutput = descriptions[descriptionIndex];
    
        console.log("Speak Output: ", speakOutput);  // Debugging output
    
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayloadDesc(DOCUMENT_IDDesc, datasourceDesc);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
    
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(requestAttributes.t('CONTINUE_MESSAGE'))
            .getResponse();
    }

};

//APL LUGARES TURISTICOS

const DOCUMENT_IDLug = "LugaresTuristicosApl";

const datasourceLug = {
    "imageListData": {
        "type": "object",
        "objectId": "imageListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://airesdehidalgo.com/wp-content/uploads/2022/11/81044657_2608139542610504_683661873291198464_n.jpeg",
                    "size": "large"
                }
            ]
        },
        "title": "lugares turísticos en San felipe orizatlán",
        "listItems": [
            {
                "primaryText": "Presa",
                "imageSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLamXBBXZPoddJAObG8nmUsF_pA3-U3Q8bJQ&s"
            },
            {
                "primaryText": "Cabañas en el Encinal",
                "imageSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsLXLP5wz0syOPwsZD1vPeC6O4y8PhC-zGOA&s"
            },
            {
                "primaryText": "Cascada de Tultitlán",
                "imageSource": "https://turismoi.mx/uploads/mx/photo/photo_file/16975/home_2159-7.jpg"
            },
            {
                "primaryText": "Rancho Tuzuntla",
                "imageSource": "https://criteriohidalgo.com/_next/image?url=https%3A%2F%2Fcdn-cubimetrix.sfo3.cdn.digitaloceanspaces.com%2Fuploads%2F2023%2F06%2Fcr13f5-Sara-Elizondo-e1686276352562-768x752.jpeg&w=3840&q=75"
            },
            {
                "primaryText": "Senderismo en el Cerro de Talol",
                "imageSource": "https://www.radiodigitaltamazunchale.com/landing/wp-content/uploads/2016/09/TALOL-480x445.jpg"
            }
        ],
        "logoUrl": "https://static.vecteezy.com/system/resources/previews/017/208/981/original/al-logo-monogram-letter-al-logo-design-al-letter-logo-design-vector.jpg",
        "hintText": "Desarrollador: Ángel de Jesús Lara Barrera"
    }
};

const createDirectivePayloadLug = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const LugaresTuristicosIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LugaresTuristicosIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const lugaresMessage = requestAttributes.t('LUGARES_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayloadLug(DOCUMENT_IDLug, datasourceLug);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        return handlerInput.responseBuilder
            .speak(lugaresMessage)
            .reprompt(lugaresMessage)
            .getResponse();
    }
};

//APL COMIDA TIPICA

const DOCUMENT_IDCom = "ComidaTipicaApl";

const datasourceCom = {
    "cardsLayoutTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://www.elsoldehidalgo.com.mx/local/9xg5rs-io6/ALTERNATES/LANDSCAPE_1140/io6",
            "headerTitle": "APL",
            "headerSubtitle": "COMIDA TIICA",
            "headerAttributionImage": "https://static.vecteezy.com/system/resources/previews/017/208/981/original/al-logo-monogram-letter-al-logo-design-al-letter-logo-design-vector.jpg",
            "primaryText": "¡San Felipe Orizatlán declarado pueblo con sabor!",
            "listItems": [
                {
                    "primaryText": "1.",
                    "secondaryText": "Bocoles",
                    "thumbnailImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRoSVk8QMYZuNU85GG4VVRXhkVquDdFF1ldQ&s"
                },
                {
                    "primaryText": "2.",
                    "secondaryText": "Enchiladas",
                    "thumbnailImage": "https://www.elsoldehidalgo.com.mx/local/hvnuji-enchiladas.jpg/ALTERNATES/LANDSCAPE_1140/Enchiladas.jpg"
                },
                {
                    "primaryText": "3.",
                    "secondaryText": "Tamales",
                    "thumbnailImage": "https://www.liderempresarial.com/wp-content/uploads/2021/09/1097652_518533_1024.jpg"
                },
                {
                    "primaryText": "4.",
                    "secondaryText": "Zacahuilt",
                    "thumbnailImage": "https://visitapapantla.wordpress.com/wp-content/uploads/2021/05/zacahuil2.jpg"
                },
                {
                    "primaryText": "5.",
                    "secondaryText": "Pan",
                    "thumbnailImage": "https://www.zunoticia.com/noticias-de-hidalgo/wp-content/uploads/2024/06/Zunoticia-Huejutla-287.png"
                },
                {
                    "primaryText": "6.",
                    "secondaryText": "Mole con Arroz",
                    "thumbnailImage": "https://www.elsoldetlaxcala.com.mx/doble-via/6e56d-mole-1.jpeg/ALTERNATES/LANDSCAPE_768/mole%20%20(1).jpeg"
                }
            ]
        }
    }
};

const createDirectivePayloadCom = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const ComidaTipicaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ComidaTipicaIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const comidaMessage = requestAttributes.t('COMIDA_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayloadCom(DOCUMENT_IDCom, datasourceCom);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        
        return handlerInput.responseBuilder
            .speak(comidaMessage)
            .reprompt(comidaMessage)
            .getResponse();
    }
};

//APL MUSICA TIPICA

const DOCUMENT_IDMus = "MusicaTipicaApl";

const datasourceMus = {
    "audioPlayerTemplateData": {
        "type": "object",
        "properties": {
            "audioControlType": "skip",
            "audioSources": [
                "https://descripcion-sanfe.s3.us-east-2.amazonaws.com/trio.mp3",
                "https://descripcion-sanfe.s3.us-east-2.amazonaws.com/banda_viento.mp3"
            ],
            "backgroundImage": "https://i.ytimg.com/vi/wpUoXWYJeI8/maxresdefault.jpg",
            "coverImageSource": "https://i.ytimg.com/vi/QCurFJoZP5E/sddefault.jpg",
            "headerTitle": "APL",
            "logoUrl": "https://static.vecteezy.com/system/resources/previews/017/208/981/original/al-logo-monogram-letter-al-logo-design-al-letter-logo-design-vector.jpg",
            "primaryText": "Roses",
            "secondaryText": "My favourite album",
            "sliderType": "determinate"
        }
    }
};

const createDirectivePayloadMus = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const MusicaTipicaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MusicaTipicaIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const musicaMessage = requestAttributes.t('MUSICA_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayloadMus(DOCUMENT_IDMus, datasourceMus);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(musicaMessage)
            .reprompt(musicaMessage)
            .getResponse();
    }
};


// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    let locale = handlerInput.requestEnvelope.request.locale;
    const localizationClient = i18n.use(sprintf).init({
      lng: locale,
      fallbackLng: 'en', // Specify fallback language
      resources: languageStrings,
      returnObjects: true,
      debug: true // Set to false in production
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = (...args) => localizationClient.t(...args);
  }
};


/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        DescripcionIntentHandler,
        LugaresTuristicosIntentHandler,
        ComidaTipicaIntentHandler,
        MusicaTipicaIntentHandler,
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(LoggingRequestInterceptor, LocalizationInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();