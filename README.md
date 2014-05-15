thesis-searcher
===============

Moteur de recherche de pdf, elasticsearch et nodejs

# API
## Contrat d'interface
### Effectuer une recherche :

 GET http://monapi.com/search/:queryString

Ou `queryString` est la chaîne de caractère que je recherche dans les metadonnées des mémoires (auteur, date, nom de fichier et contenu du mémoire).
Cette méthode retourne une liste des mémoires concernés avec pour chaque mémoire les métadonnées. Elle ne retourne pas son contenu.

 GET http://monapi.com/pdf/:id
 
Ou `id` est l'identifiant du mémoire recherché.
Cette appel retourne les métadonnées du mémoire ainsi que son contenu.
