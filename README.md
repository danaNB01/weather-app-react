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

EXTRA FUNCTIONS:

- Add geolocation detection to automatically show weather for the user's current location on first visit
- Implement a favorites/saved locations system where users can bookmark frequently checked locations
- Implement a "Compare Locations" feature to view weather side-by-side for multiple locations
- Include UV index, visibility, and air pressure data (available via Open-Meteo)
- Add sunrise/sunset times with visual indicators
- Add animated weather backgrounds that change based on current conditions
- Implement voice search functionality
- Create dark/light mode themes that adapt to the time of day
- Add progressive web app (PWA) capabilities for mobile installation
- More days to the 7 days forecase 'slide', in the api docs you can add how many days ahead.

---

Yes, I'm absolutely sure. That's a great question to ask, as API documentation can sometimes be dense. The parameter is definitely there, and it's the standard way to request a multi-day forecast.

The confusion might arise because forecast_hours and forecast_days are two different ways to control the forecast period. You typically use one or the other, not both.

Where to Find it in the Documentation
You can find this parameter in the main Open-Meteo Forecast API documentation under the "Request Parameters" section.

Here's a breakdown of the relevant parameters that control the time interval:

forecast_days: This parameter lets you specify the number of days for the forecast, from 1 to 16. If you don't specify any time range, the API defaults to 7 days.

forecast_hours: This is for getting a very short-term forecast. It can be set to 24, 48, 72, or 96 hours. It overrides the forecast_days setting.

past_days: Lets you retrieve historical data for the last 92 days.

Why the Change Works
In your original code, you used forecast_hours=6. This specifically told the API: "Ignore the default 7-day forecast; I only want the next 6 hours of hourly data."

By removing forecast_hours=6, you are removing that specific instruction. The API then reverts to its default behavior, which is to provide a 7-day forecast.

Adding forecast_days=7 is technically not even necessary (since it's the default), but it makes the code much clearer and explicitly states your intention to get a 7-day forecast. It's good practice to be explicit.

So, the proposed change is the correct and standard method for getting the full 7-day hourly data you need for your dropdown menu.

--
is threr a way ti limit the hours displayed for each day? also what makes more since is it more reliable to display the current hour with next like 6 hours, then for the other days it starts from 12 am, i don't know what is better for a user experience?

This gives users immediate, relevant information for "right now" while providing a complete overview for future planning.

You can achieve this -> by adding a simple check. Before rendering the hourly list, determine if the selectedDay is today. If it is, filter out past hours.
steps:

- Get Today's Date: First, we need a string for today's date in the same YYYY-MM-DD format that the API uses.

- Apply Conditional Filtering: Create a new variable (displayableHourlyData) that will hold the final list of hours to be shown. If the selected day is today, we filter and slice it. Otherwise, we use the full 24-hour list.

---

PROBLEM:
ok another question, in the hourly section for today it filters out the past hours and slice out to show current + next 6 hours. 1- i wanna filter out past hours but show the next hours till the end of the day. 2- for days other than today the day starts at 3 am and not 12 am

1- To show all remaining hours for the current day instead of just the next 7, you simply need to remove the .slice(0, 7) call from your condition for today's date.

2- The reason your future days start at an offset (like 3 AM) is due to the time zone offset of the location you selected.

// Get the hourly data for the selected day
const hourlyDataForSelectedDay = forecast
? // Merge the 2 arrays 'time' and 'temperature_2m' into an array of objects
forecast.hourly.time
.map((time, index) => ({
time: new Date(time),
temp: forecast.hourly.temperature_2m[index],
}))
.filter((item) => item.time.toISOString().startsWith(selectedDay))
: []; this one to get the hourly data for the selected day whihc is good in UTC-based, but the data is edited based on the user's browser's timezone and in our case Riyadh UTC+3. so we end up with midnight offset issue and start the day at 3 AM.
how to fix? use

---

    PROBLEM: USING If you were to use a different locale, like 'en-US', the output would be MM/DD/YYYY (e.g., "10/03/2025"), which wouldn't match your selectedDay format and would break the filter.
    When you call item.time.toISOString(), JavaScript converts the Date object to a UTC string.

For the 12:00 AM entry on Oct 3rd in Riyadh (UTC+3), the UTC time is 3 hours earlier: 2025-10-02T21:00:00.000Z.

item.time.toISOString() returns "2025-10-02...".

Your filter checks if this starts with selectedDay (e.g., "2025-10-03").

Result: It returns false, and the 12:00 AM, 1:00 AM, and 2:00 AM entries for Oct 3rd are filtered out, making the day appear to start at 3:00 AM.

    solution: filter the hourly data based on the local date of the time entry

We used the Swedish locale code ('sv') in toLocaleDateString('sv', ...) because it is one of the most reliable ways in JavaScript to guarantee the output format is the ISO standard YYYY-MM-DD (e.g., "2025-10-03"). This was necessary to correctly filter the hourly weather data. By using the toLocaleDateString() method, we ensured the date was calculated based on the data's local time zone (not UTC), which fixed the bug where future days appeared to start late (e.g., at 3 AM instead of 12 AM). In essence, we used 'sv' for its consistent format, not its language.

more fancy answer but i don't like it -> We used the Swedish locale code ('sv') in toLocaleDateString() to ensure the generated date string reliably matches the YYYY-MM-DD format used by the API. This method is critical because it extracts the date based on the local time zone of the forecast, correctly aligning midnight (12 AM) entries with the intended calendar day and resolving the issue caused by filtering against UTC time.

---


Note:
when it comes to icons ->
daily is always at day never at night, only current and hourly can have night.