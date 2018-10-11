# ace-angular
Using Ace Editor in AngularJS

## Requeriments
- AngularJS: npm install angular
- Ace Builds: npm install ace-builds

## Install

```
npm install ace-angular
```
## Usage
```html
<!-- Load Angular -->
<script src="node_modules/angular/angular.js"></script>
<!-- load ace -->
<script src="node_modules/ace-builds/src-min/ace.js"></script>
<!-- load ace language tools -->
<script src="node_modules/ace-builds/src-min/ext-language_tools.js"></script>
<!-- load ace-angular -->
<script src="node_modules/ace-angular/ace-angular.js"></script>
```
Create angular module
```js 
var app = angular.module('myapp',['ace.angular']);
```
Using directive
```html 
<div ace-editor="aceOptions" ng-model="aceContent"></div>
```
Controller

```js 
$scope.aceOptions = {
	method: 'sql',
	theme: 'sqlserver',
	onLoad: function(editor, session, ace){
		// do anythig
	}
}
```