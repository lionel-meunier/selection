Selection
=========
Created by : Lionel Meunier

Angularjs directive add $selected variable in childscope to ng-repeat.

Documentation
=============

Include required librairie [underscore](http://underscorejs.org/).

Inject module into your app.
```
angular.module('App', ['lionel-meunier.selection']);
```

Developers
==========

Using bower for install or clone [repo](https://github.com/lionel-meunier/selection.git).

Using
=====

Repeat your list and add toggle link.

```
<ul>
	<li ng-repeat="item in list" selection="listSelected">
		<a ng-click="$selected!=$selected">Toggle</a>
		<span>{{item}}</span>
	</li>
</ul>
```

"listSelected" matches all items in the list that has "$selected" to true.

Filter
======

The filter "selectedOrdering" to sort the list of selection by keeping the order of the main list.

```
<ul>
	<li ng-repeat="item in list" selection="listSelected">
		<a ng-click="$selected!=$selected">Toggle</a>
		<span>{{item}}</span>
	</li>
</ul>
<ul>
	<li ng-repeat="item in listSelected | selectedOrdering : list">
		{{item}}
	</li>
</ul>
```