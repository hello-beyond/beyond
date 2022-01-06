# Notes
The concept of dependency in the tsc compiler is as follows:
* All modules imported as a non-relative resource is a dependency.
* Only those that start with beyond_modules or beyond_libraries are considered BeyondJS module dependencies.
* beyond_context is another BeyondJS dependency.
