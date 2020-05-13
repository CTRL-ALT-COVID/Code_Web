window.watsonAssistantChatOptions = {
    integrationID: "648166ec-9f71-45dd-a68d-4bafd5a9c9d2", // The ID of this integration.
    region: "eu-gb", // The region your integration is hosted in.
    serviceInstanceID: "50737d71-e9be-4530-8a3a-28a0b5c0189a", // The ID of your service instance.
    onLoad: function(instance) { instance.render(); }
  };
setTimeout(function(){
  const t=document.createElement('script');
  t.src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
  document.head.appendChild(t);
});