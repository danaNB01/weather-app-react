10/9/2025 Wednesday

my second project fetching data in React.
lets start small. just fetch the data.

ok fetching is easy I need to understand the data model/structure of the response.

---

11/9/2025 Thursday

Yesterday I was happy that I tested the API requests and it worked, but reality hit today. This is my first 'big' React project, how do you tackle a project like this?

I checked the project's starter file as well as the Figma design, and I realized that the are 2 rules to make this project possible: a good solid planning and 'keep it simple' mindset.

so lets break down 'plan' our steps:
should I learn Tailwind along the way? focus on the main thing you can always refactor later.

Phase 1 — Setup (Day 1)

- Create React app (Vite).

- Make the search bar + display current weather (basic fetch).
- create a repository and push your work
- create GitHub pages.

Phase 2 — Data fetching (Days 2–4)

-Implement current weather first.

-Implement 7-day forecast.

-Implement hourly forecast.

-Add unit toggling (C/F, mph/kmh, etc.) - temperature/feels like/min&max/hourly forecast - wind - precipitation.

-Use useEffect + state hooks to fetch data based on:

    -Current location

    -Selected day

    -Selected unit system

Phase 3 — UI/UX (Days 4–6)

- Apply styling based on the Figma file using plain CSS.

- Add hover/focus states.

- Make it responsive (mobile-first).

Phase 4 — Polish & Deploy (Days 6–7)

- Add error handling (e.g., “Location not found”).

- Add loading indicators.

- Test on mobile and desktop.

---

tips for myself:
Make small commits — one feature at a time.

Don’t overthink architecture; a few components and states are fine.

Ship incrementally; don’t try to build everything at once.

---

_what data is required on the page?_
the location from user input
today's day and date
temperature
is day sun night moon
the feels like - humidity - wind -precipitation

daily forecast - 7 days -> day name - icon - min&max

hourly forecast - this hour + 7 hours later so 8?? -> icon - hour - pm or am 'isDay' - temperature

QUESTION: what are the icons based on?
QUESTION: how many hours on the hourly forecast from now?

---

_what are the main functionalities, what can the user do/interact/request/ask?_

Search location.

change the unit of.....
change the day in hourly forecast - list is always from Monday to Sunday.

QUESTION: when a user change the day in hourly to tomorrow at what time does the hourly forecast start?

---

Sunday 14/9/2025
https://www.figma.com/proto/ly7pw6xNY7EbuyK7316MKg/weather-app?node-id=118-445&p=f&viewport=-51%2C-2931%2C0.5&t=EIBl489XXAhRgL2L-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=118%3A445

_Phase 1 — Setup (Day 1) - 1 day_

- Create React app (Vite).

- Make the search bar + display current weather (all the data above) -> SEARCH FUNTIONALITY.

- create a repository and push your work
- create GitHub pages.

Is there a way to send the city name? it seems like i need the lat and long!
https://youtu.be/HS7GfTuJgA8?si=7NG3ISO_ggvCPQEf
props to this guy, there is another endpoint that open metoe provides -> geocode.
show the city if the entered city name matches the fetched:
city name exclude the one's that matches the time zone only.
many options? drop down menu to the user.

STEPS:

- user enter the city
- the geocoding api will return one or multiple cities that matches the user input.
- the user will choose from the drop down menu -> city, country format.
- send the chosen one's lat and long to the open mateo api.

---

## I found an amazing animation library with a collection of ready-made animations. why reinvent the wheel?
