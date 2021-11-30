# Texts

## The .enabled property

Every time that language is changed in the application (beyond.application.language), the texts are updated. To prevent
views from being updated due to changes in the language of the texts, when they are inactive, the .enabled property is
used.

The .enabled property allows you to enable / disable automatic text loading.

Use this property to prevent inactive views from being modified, for example, each time a page is hidden, set the
enabled property to false, and when it is displayed again, set it to true.

By setting the .enabled property to true, the loading of the texts is activated automatically if they were not
previously loaded or if the language has changed since it was deactivated.

The .enabled property is set to true automatically every time the .load() method is executed.

## The .ready property

When accessing the .ready property, the texts are loaded automatically.
