Selection
=========
Created by : Lionel Meunier

Angularjs module selection of item with all events as possible.

For computer selection taking into account the shift and ctrl to select multiple items. 
Selection for mobile with touch start and stop to select multiple items.

Module in development
=====================

Cette directive permet de rajouter dans les scopes enfant de ng-repeat une valeur $selected.
Chaque changement de cette valeur permetra d'ajouter les items du ng-repeat à une liste "listeSelected".

Prérequis :
Attr : ng-repeat
Liste selected is Array
If not empty tous les éléments de la liste "listeSelected" doivent être egals à des éléments de la liste.

A vérifier :
Les éléments de la listeSelected sont trié dans le même ordre que la liste du ng-repeat avant l'intervention des filtres.

