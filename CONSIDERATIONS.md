## Considerations on the project

The project can be found deployed on vercel at [this link](https://app-trips.vercel.app/).

This is a list of considerations that went through my mind when building the project
and a series of suggestions for features/improvements that I would have liked to add if I had more time.

### Branding

I kinda dropped the ball on this, but the branding I applied is more "BizAway centered" that what is suggested in the assignment. All components and code are branded as `ba` for BizAway. It would likely have been more appropriate to brand them as `at` for `App-trips`.

### Http interactions

I chose to just use the fetch API to handle http calls. I looked into Angular's HTTP service and hot it's usually used but I didn't really see any particular benefit in using that for this simple application. The choice was also done based on the time I had to work on the project. Had I had more time I definitely would have explored that feature more in depth and maybe used it.

### Services and core logic structure

#### Services structure

The application leverages a series of services that loosely follow [this structure](https://www.figma.com/board/CS37a7UwSCFpRILqyJOAXd/BA-App?node-id=39-126&t=SKSGILpXnc55Pudf-0). Drawing this diagram is the way I approached the development of the app, and it could be slightly improved to also act as a technical document, explaining some more details about all the services and their role.

All the services that are not injected in the root are meant to be reused as modules in future service developments (list and detail services would be the building blocks of services for all resources, like they are for trips)

#### List services

One of the things I think would very much like to ad is filters to query the APIs. The ListViewService is meant to be extended with a new ListFiltersService that manages the state of a generic filters form and handles persistence in the local storage, very much like the ListSortService does.

I would add a button next to the sort input, that when clicked opens a small form for the filterable fields that are documented in the swagger. Similar to what is done by [dribble](https://dribbble.com/)

Another thing I would add to the functionality of services under the ListViewService is a way of writing filters and sorting as query parameters in the page's url, as well as being able to read them and hydrate the state based on the retrieved values. This way a user could share a link to a very specific list with filters/sorting applied. This data would likely need to override the one stored in the localStorage.

#### Resource detail service

This service uses a very rudimental way of preventing unnecessary API calls when we try to load a trip that is already stored in the service. This works in this simple use case, but if I were to build a larger and more complex application I would likely scout for client side caching and deduping solutions like the ones given by [tanstack-query](https://tanstack.com/query/latest)

### Internationalization

If this was a real world application I would definitely have went with an internationalization service, like `@angular/localize`.

I read the following consideration in the tech assignment markdown file:

> App Trips can have users in different countries

But I wasn't sure it required such a solution. Also since the catalog of trips provided by the APIs does not provide the option to ask for a specific language (or at least as far as I could see, I might be wrong), I though it would not be a great user experience to have ana pp with a multilanguage feature that only changed the static text.

### UI

#### Trips detail page

I evaluated some different layout options for the trip detail page, all of which can be seen [here](https://www.figma.com/board/CS37a7UwSCFpRILqyJOAXd/BA-App?node-id=40-127&t=SKSGILpXnc55Pudf-0).

Ultimately I went with the one because the images provided by the API are in some kind of portrait mode, so other options didn't make as much sense. If images were in landscape mode I would have likely went with one of the first 2 options since it seems to be the preferred ones, seeing some references ([airbnb](https://www.airbnb.it/rooms/5337141?adults=1&category_tag=Tag%3A8225&children=0&enable_m3_private_room=true&infants=0&pets=0&photo_id=138337197&search_mode=flex_destinations_search&check_in=2025-02-06&check_out=2025-02-11&source_impression_id=p3_1735055129_P3w9wcUxQK26aL8Y&previous_page_section_name=1000&federated_search_id=087d8606-29e2-4ef1-8556-eb298d65dbbe), [SiVola](https://www.sivola.it/viaggi/thailandia-zaino-in-spalla?_gl=1*7bv2jk*_up*MQ..*_ga*MTM2NTY3NjMyMi4xNzM1OTIwNzY2*_ga_Z3X1RPECTZ*MTczNTkyMDc2Ni4xLjAuMTczNTkyMDc2Ni4wLjAuMTY1NjIzNjM4Mg..*_ga_PV2159KTYG*MTczNTkyMDc2Ni4xLjAuMTczNTkyMDc2Ni4wLjAuMA..), ..)

#### Components

Since this was my first experience with an Angular app I treated it a bit like a playground. Not all choices make 100% sense, but I wanted to explore some of the features (or sometimes I just needed to cut corners). Here are some quick considerations:

- The tooltip component is a very simple implementation and does not currently adjust the direction they are displayed in based on whether they go outside of the viewport or not. I would actually suggest to use an external UI library for components like this one.
- The IconHighlighterComponent is an exercise in how to pass data to content projections, it kind of is an overkill given its application but it was something I wanted to explore
- The button and select components also are some exploration of the feature that allows to extend a native element's behavior, which is very interesting but I am not 100% still if it's the best approach or not for these cases.

### Conclusion

Overall I had a ton of fun doing this assessment. Thank you for reviewing it and reading so far if you got here. Cheers!
