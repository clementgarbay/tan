# Application web et mobile hybride TAN

Application hybride iOS du Transport en commun de l'Agglomération Nantaise avec Mobile Angular UI : consultation des horaires, visualisation des plans, sauvegarde de grilles horaires pour une consultation hors ligne, affichage des infos trafic.   

[Démo (version web)](http://clementgarbay.fr/projects/tan/)

## Get started

Initialisation de l'application iOS Cordova (et des plugins associés) :  
```
./init.sh
```

Développement local :
```
cd www && grunt
```

Pour compiler l'application Cordova :
```
cordova build ios
```

## Données

Les données sont issues de l'API TAN sur [data.paysdelaloire.fr](http://data.paysdelaloire.fr).  

## Autres plateformes

Bien entendu, il est théoriquement possible de packager l'application pour Android ou autre. Cependant, il faudra faire des modifications au niveau du lecteur de PDF (celui que j'utilise est seulement compatible iOS).
