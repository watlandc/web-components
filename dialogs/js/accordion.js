/*------------------------------------*\
  #TABS
\*------------------------------------*/

var topics = [
  {
    'id': 'topic--1',
    'title': 'Topic 1'
  },
  {
    'id': 'topic--2',
    'title': 'Topic 2'
  },
  {
    'id': 'topic--3',
    'title': 'Topic 3'
  },
  {
    'id': 'topic--4',
    'title': 'Topic 4'
  },
  {
    'id': 'topic--5',
    'title': 'Topic 5'
  }
];

var links = [
  {
    'id': 'link--1',
    'title': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at mauris ut ligula euismod rhoncus. Nulla facilisi. Duis a lacus cursus, euismod velit ornare, ultricies lectus. Integer semper facilisis velit et dignissim. Suspendisse potenti. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tristique mauris lacus. Ut diam velit, aliquam vel nibh eu, consequat sodales diam. Nunc rutrum nisi nunc, eu efficitur eros blandit vel. Vestibulum cursus elit vel risus egestas, dictum sollicitudin risus fermentum.'
  },
  {
    'id': 'link--2',
    'title': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at mauris ut ligula euismod rhoncus. Nulla facilisi. Duis a lacus cursus, euismod velit ornare, ultricies lectus. Integer semper facilisis velit et dignissim. Suspendisse potenti. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tristique mauris lacus. Ut diam velit, aliquam vel nibh eu, consequat sodales diam. Nunc rutrum nisi nunc, eu efficitur eros blandit vel. Vestibulum cursus elit vel risus egestas, dictum sollicitudin risus fermentum.'
  },
  {
    'id': 'link--3',
    'title': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at mauris ut ligula euismod rhoncus. Nulla facilisi. Duis a lacus cursus, euismod velit ornare, ultricies lectus. Integer semper facilisis velit et dignissim. Suspendisse potenti. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tristique mauris lacus. Ut diam velit, aliquam vel nibh eu, consequat sodales diam. Nunc rutrum nisi nunc, eu efficitur eros blandit vel. Vestibulum cursus elit vel risus egestas, dictum sollicitudin risus fermentum.'
  },
  {
    'id': 'link--4',
    'title': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at mauris ut ligula euismod rhoncus. Nulla facilisi. Duis a lacus cursus, euismod velit ornare, ultricies lectus. Integer semper facilisis velit et dignissim. Suspendisse potenti. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tristique mauris lacus. Ut diam velit, aliquam vel nibh eu, consequat sodales diam. Nunc rutrum nisi nunc, eu efficitur eros blandit vel. Vestibulum cursus elit vel risus egestas, dictum sollicitudin risus fermentum.'
  },
  {
    'id': 'link--5',
    'title': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at mauris ut ligula euismod rhoncus. Nulla facilisi. Duis a lacus cursus, euismod velit ornare, ultricies lectus. Integer semper facilisis velit et dignissim. Suspendisse potenti. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tristique mauris lacus. Ut diam velit, aliquam vel nibh eu, consequat sodales diam. Nunc rutrum nisi nunc, eu efficitur eros blandit vel. Vestibulum cursus elit vel risus egestas, dictum sollicitudin risus fermentum.'
  }
];


// add topics
for (var i = 0; i < 5; i++) {
  
  // populate topic
  var topicTemplate = document.querySelector(".js-topic-template").content.cloneNode(true);
  topicTemplate.querySelector(".js-topic__input").setAttribute("id", topics[i].id);  
  topicTemplate.querySelector(".js-topic__overview").setAttribute("for", topics[i].id);
  topicTemplate.querySelector(".js-topic__title").innerHTML = topics[i].title;

  // populate link
  var linkTemplate = document.querySelector(".js-link-template").content.cloneNode(true);
  linkTemplate.querySelector(".js-link__title").innerHTML = links[i].title;

  // append templates
  topicTemplate.querySelector(".js-topic__content").appendChild(linkTemplate);
  document.querySelector(".js-accordion-card").appendChild(topicTemplate);
    
}