live demo: ['https://dananb01.github.io/weather-app-react/']

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

    -Selected day - hourly

    -Selected unit system

Phase 3 — UI/UX (Days 4–6)

- Apply styling based on the Figma file using plain CSS.

- Add hover/focus states.

- Make it responsive (mobile-first).

Phase 4 — Polish & Deploy (Days 6–7)

- Add error handling (e.g., “Location not found”).

- Add loading indicators.

- Clean code. -> into components

Phase 5 - Submission check ups (Days 8-9-10)

- live website check
- Readme file
- submission details and requirements

---

tips for myself:
Make small commits — one feature at a time.

Don’t overthink architecture; a few components and states are fine.

Ship incrementally; don’t try to build everything at once.

---

_what data is required on the page?_

- current weather

  - the location from user input DONE
  - today's day and date DONE
  - temperature DONE
  - is day sun night moon DONE
  - the feels like DONE
  - humidity DONE
  - wind DONE
  - precipitation DONE

- daily forecast - 7 days

  - day name DONE
  - icon QUESTION: what are the icons based on?
  - min&max DONE

- hourly forecast - this hour + 5
  - icon
  - hour DONE
  - pm or am 'isDay' DONE
  - temperature DONE

---

_what are the main functionalities, what can the user do/interact/request/ask?_

- Search location. DONE

- change the unit of.....
- change the day in hourly forecast - list is always from Monday to Sunday. QUESTION: when a user change the day in hourly to tomorrow at what time does the hourly forecast start?

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
- the geocoding api will return one or multiple cities that matches the user input. - only the city name.
- the user will choose from the drop down menu -> city, country format.
- send the chosen one's lat and long to the open mateo api.

---

## I found an amazing animation library with a collection of ready-made animations. why reinvent the wheel?

--
17/9/2025 Wednesday
Phase 2 — Data fetching (Days 2–4)

-Implement current weather first. DONE

-Implement 7-day forecast. DONE

-Implement hourly forecast. DONE

-Add unit toggling (C/F, mph/kmh, etc.) - temperature/feels like/min&max/hourly forecast - wind - precipitation.

-Use useEffect + state hooks to fetch data based on:

    -Current location

    -Selected day - hourly

    -Selected unit system

---

- I had to turn on the timezone auto detection, cuz I was getting the is day value incorrect since the time was not inaccurate.
- in the daily forcase we fetch the date from the time attribute, how to convert it into day labels? use toLocaleDateString method inside the Date object. -> use the same method in the current weather to get day label, day, month, and year.
- range the hourly forecase to 6 hours only. current + 5.

---

_data left to fetch:_

- daily forecast - 7 days
  - icon QUESTION: what are the icons based on?
- hourly forecast - this hour + 5
  - icon QUESTION: what are the icons based on?

_functionalities left:_

- change the unit of.
- change the day in hourly forecast -> drop-down menu is always from Monday to Sunday. QUESTION: when a user change the day in hourly to tomorrow at what time does the hourly forecast start?

_phase 2:_

- Add unit toggling (C/F, mph/kmh, etc.) - temperature/feels like/min&max/hourly forecast - wind - precipitation.

- Use useEffect + state hooks to fetch data based on:

  -Current location [user input search] DONE

  -Selected day - hourly [when the user change the day in hourly]

  -Selected unit system [when the user change the unit of any data]

QUESTION: what are the icons based on?
WMO code
https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c#file-descriptions-json

---

Tuesday 30/9/2025
6 days left on submissions, I am already behind but lets try and push it.
problem: unit systems
Q: what can users do/change?
A: either the whole unit system or an indivisual measure
notes: changing unit system reflect on the individual inputs but not vice versa - the api request does not accept metric units, only imperial.

steps:
1- switching unit systems

- add radio inputs
- update unit state accordingly
- add params to api request
- update ui to reflect changes
  2- integrate switching individual units
  - Q: do we need different state for each unit or can we use the same unit system state?
  - A: we need a different state for each measurement since user can change the (ex. temperature) only.
  - inputs for each measure
  - handle a change of each input by updating its state.
  - refetch with dynamic url

3- integration

- when user switch metric/imperial, reflect those changes on the individual measurement inputs -> inside switchSystem function set the state of each measurement.
- Q: having multiple state 'system and individual' what is the UI's source of truth, we will face a lot of conflict when it comes to priorities, is the priority for the system units or the individual changes?
- A: had to add another value 'custom' to the unit system state for better control -> the state equals this value only if the user changed a unit for one of the measurements and not the whole system. metric -> metric units, imperial -> imperial units, custom -> the units are chosen by the user. Why? this is crucial to avoid conflict or overriding of system unit and individual unit states. Once the user change an individual unit it takes priority over the imperial/metric, how? whenever the user pick a single unit, change the system state into custom.

4- the dynamic url

- have a baseUrl to fetch data of a city with default units
- create an array for params to add user's unit selections.
- everytime a unit state changes, push the corressponding units into the params array.
