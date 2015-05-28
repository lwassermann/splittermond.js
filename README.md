# splittermond.js

This has evolved a bit and while it is still a rendering application for Splittermond[[1]](http://www.splittermond.de) Characters, there are some more ideas on the one hand, and some more diverse technology use underneath.

Playing with *React*[[2]](https://facebook.github.io/react/) and getting a feel for its model of computation is still a large part. And some things are not clear in there. For example, why does using `onMouseEnter/Leave` for JS-hover lead to serious next-rendering-loop state loss, while using `onMouseOver/Out` with the identical application code behaves as wished for?

Also multiple setState-calls don't work well and the pattern I have adopted of remembering the next state in the current state feels like an unnecessary hack. But for the time that works well.

Another technology-experiment here is figeting with *flexboxes*[[3]](http://www.w3.org/TR/css3-flexbox/).

Ideas & Challenges for the future (with increasing distance and decreasing likelyhood) include
* some form of rule-guided character creation, trying to find some DSL for such point-guided character creations
* incorporation of virtue/benefit specialized rules w/o having to incorporate them all over the codebase (still open from earlier experiments w/ other rule-systems, a foggy idea at the back of my head involves adapters)
* saving to Github using Octokat.js[[4]](https://github.com/philschatz/octokat.js) as a shallow wrapper around the Github-API, maybe encrypted, to emulate some privacy scheme,
* simulations of fights w/ synchonization of the scene across multiple screens, maybe even in different modes. The envisioned interaction model would be a tablet in the middle of the table mirroring the fighting and alleviation of the gamemasters table-keeping (using diffsync[[5]](https://github.com/janmonschke/diffsync) for sync), additional challenge is a hex-pattern with div-boxes?

[1] [Official Splittermond Website](http://www.splittermond.de)

[2] [Official React Website](https://facebook.github.io/react/)

[3] [Flexboxe Spec](http://www.w3.org/TR/css3-flexbox/)
see also [Solved by Flexbox](http://philipwalton.github.io/solved-by-flexbox/) for examples

[4] [Octokat.js Repository](https://github.com/philschatz/octokat.js)

[5] [Diffsync Repository](https://github.com/janmonschke/diffsync)
