## This is a coding exercise for Zenefits. 

<p>I have created a mobile web app that allows you to create, view and edit/remove short text notes. There is no fancy formatting support for the notes, but white space is preserved.</p>

#### Things to note: 
1. I know that Zenefits uses EmberJS but I'm most familiar with AngularJS and figured it would be a better measure of my ability.
2. Because the instructions required a runnable index.html file with no web server navigation using Angular's HTML5 mode does not work and so hashbang navigation must be used instead.
3. For the same reason above, template partials must be declaratively added to the cache in index.html rather than loaded asynchronously from other files
4. For the sake of simplicity I have not concatenated or minified any of the JS or CSS. I would usually use a build tool like Grunt or Gulp for that


### ARCHITECTURE
#### App:
*/js/Zenefits.js*
<p>The namespace. A simple namespace that can add things into itself. Doesn't handle things like inheritance/polymorphism or dependency management like a normal namespace would.</p>

*/js/Module.js*
<p>The AngularJS module. Contains route definitions and controller bindings.</p>

#### Models:
*/js/models/Note.js*
<p>A model service for creating and dealing with Note model objects within the app.</p>

#### Classes:
*/js/classes/Api.js*
<p>Meant to serve as a stand-in for the back-end. Provides typical request methods (get, post, etc.) and manages the upkeep of the "database" decribed below.</p>

*/js/classes/DataStore.js*
<p>This class is essentially a polyfill for LocalStorage. In all practical cases it will never be used it was simple enough so I figured why not.</p>

#### Views: 
- \#/ (NotesController): *View all notes created*
- \#/create (CreateController): *create a new note*
- \#/note/{id} (NoteController): *view a specific note*
- \#/note/{id}/edit (EditController): *Edit or delete an existing note*
