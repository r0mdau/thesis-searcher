thesis-searcher
===============

Moteur de recherche de pdf, elasticsearch et nodejs

## Quick start
* Installer [node.js](http://nodejs.org/), [Java](https://www.java.com/fr/download/), [elasticsearch](www.elasticsearch.org).
* Démarrer elasticsearch.
* Se placer à la racine du projet, lancer la commande `npm install`.
* Ensuite lancer le script d'initialisation de la base : `bash startBase.sh`.
* Mettre les pdf dans le dossier `worker/pdf`.
* Se placer dans ce dossier et lancer la cronjob en arrière plan : `node cronjob.js &`.
* Se placer à la racine du projet et lancer le service web : `sudo node thesis-searcher.js`.
* Editer le fichier `views/js/application/thesisSearcherServices.js` et mettre l'adresse ip du service web.


## API Contrat d'interface
### Effectuer une recherche :

`GET http://monapi.com/search/:queryString`

Ou `queryString` est la chaîne de caractère que je recherche dans les metadonnées des mémoires (auteur, date, nom de fichier et contenu du mémoire).
Cette méthode retourne une liste des mémoires concernés avec pour chaque mémoire les métadonnées. Elle ne retourne pas son contenu.

`GET http://monapi.com/pdf/:id`
 
Ou `id` est l'identifiant du mémoire recherché.
Cette appel retourne les métadonnées du mémoire ainsi que son contenu.

Valeurs de retours détaillées dans le wiki : [API](https://github.com/r0mdau/thesis-searcher/wiki/API)
