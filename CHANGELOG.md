# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

##[To Do]

- Do some code refactoring in the header in order for the logout button to work by using Property Accessors in the header component.




## [Unreleased]
### Added
- 

### Changed
-

## [0.0.1] - 2016-09-11
### Added
- Added support for different login types.
- Provided an implementation for a token generator to be used in combination with a RESTful API service.
- Provided an implementation of a method that access a remote resource (through an URL) in order to see 
  if a user is actually logged in the system.
- Possibility to dynamically select the right login method based on the parameter passed by value to the statement (click)="onSignin('theType')"
  This was achieved using Property Accessors that allow me to use a way more compact syntax than a switch: this[theType + 'Login'].aMethod();
  
