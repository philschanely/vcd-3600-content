---
layout: lesson
title:  "1: Mobile First Mindset"
---
### Mobile First

This class we'll talk about the following topics:

* "Mobile First" by LukeW
* Responsive stops reversed

### Media Queries

For Mobile First work in CSS we will typically start with our mobile styles and add media queries up from there using `min-width` filters. Here is a template you can use:

```css
/* mobile styles */

@media screen and (min-width:768px) {

    /* portrait tablet styles */

}

@media screen and (min-width:1200px) {

    /* desktop styles */

}

@media screen and (min-width:1920px) {

    /* widescreen styles */

}
```