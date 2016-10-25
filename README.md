#### Projet d'étude pour le cours de paradigme des échanges internet INF4375 réalisé en Node JS

*Le but de ce projet est réadaptation du projet du cours INF4375 en Node.JS pour faciliter l'apprentisage de ce framewokr et appronfondir mes connaissances sur le langage de JavaScript. Comme pour le projet on a défini un API REST pour pouvoir communiquer avec notre serveur web. L'utilisation de MongoDB comme base de donnée no SQL est retenue ainsi que son Framework Mongoose. Contrairement au projet initial fait en Java, on a permis cette la gestion de la création d'un compte utilisateur est requis pour pouvoir utiliser l'application. Jettez un coup d'oeil sur le README du projet paradigmeInternetJAVA pour mieux comprendre le lien et la différence entre ces deux projets. Voici les actions possibles par un utilisateur du système.*

1. *Créer un nouveau utilisateur = Verbe HTTP utilisé: POST, Ressource: "http://localhost:4000/users/signup"*
2. *Avoir le fil complet d'un utilisateur = Verbe HTTP utilisé: GET, Ressource: "http://localhost:4000/utilisateurs/fil"*
3. *Créer un nouveau tweet = Verbe HTTP utilisé: POST, Ressource: "http://localhost:4000/utilisateurs/tweet"*
4. *Avoir la liste de tous ses tweets d'un utilisateur  = Verbe HTTP utilisé: GET, Ressource: "http://localhost:4000/utilisateurs/tweets"*
5. *Avoir un tweet ou en supprimer un  = Verbe HTTP utilisé: GET ou DELETE, Ressource: "http://localhost:4000/utilisateurs/tweet"*
6. *Avoir la liste de tous ses retweets = Verbe HTTP utilisé: GET, Ressource: "http://localhost:4000/utilisateurs/retweets*
7. *Créer un retweet ou d'en supprimer un = Verbe HTTP utilisé: PUT ou DELETE, Ressource: "http://localhost:4000/utilisateurs/retweet"*
8. *Avoir la liste de tous ses abonnés  = Verbe HTTP utilisé: GET, Ressource: "http://localhost:4000/utilisateurs/abonnements"*
9. *Ajouter un abonné à sa liste = Verbe HTTP utilisé: GET, Ressource: "http://localhost:4000/utilisateurs/abonnements"*

**Architecture du projet**

*Dans ce projet je me suis concentré seulement sur le Back-End du service et gardé aussi le style Architecturale MVC*

**Conception du projet et l'explication sur les différents packages**

1. *Le package Model comprend l'objet Mongoose qui représente un utilisateur du système et un fichier qui permet l'implementation du patron DAO pour faciliter les reqêtes à la base données et qui est indépendant de la base de donnée utilisée.*
2. *Le package serverRoutes comprend les différents routes qui sont implémentés par le serveur.*
3. *Le package view comprend le format de réponse que le serveur envoit au client ce qui est du JSON cette fois.*
4. *Le package service comprend les fonctions utilitaires proposés par le serveur comme le hashage du password, l'utilisation des tokens, la navigation des liens par Hateoas, et le service passport-facebook pour la connexion par les réseaux sociaux.*
5. *Le package configuration contient la configuation du service et la methode de connexion à la base de données MongoDB via Mongoose.*
6. *Le fichier app.js qui est le point d'entrée de l'application.*

#### N'Hésitez pas à jeter un coup d'oeil sur le code pour plus de commentaire et d'explication supplémentaire ####
