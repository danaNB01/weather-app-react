# 🚀 My Weather App: A React Hackathon Journey

Hey there! 👋 Welcome to my README file.

I wanted to keep a running log of my thoughts, problems, and solutions as I built this weather app... so this could be a long read.

✨ Check out the deployed project here: [Weather App Live Demo](https://weather-app-react-final-ghhwuqlko-dananb01s-projects.vercel.app/)

## 🗓️ The Journey Begins

### 10/9/2025 Wednesday

My goal for today was simple: **just fetch the data**. Coming from my first project, I thought fetching in React would be a easy. And it was! Initially. My biggest takeaway here was that getting the data is one thing; **understanding the data model/structure of the response** is a whole other beast.

---

### 11/9/2025 Thursday

Reality check! Yesterday's high of "fetching is easy" quickly turned into the daunting question: **how do you tackle a big React project?**

After staring at the project's starter file and the Figma design, two golden rules emerged: **solid planning** and a **"keep it simple" mindset**.

So, I broke it down into phases.

#### My Game Plan:

- **Phase 1 — Setup:**
  - Create React app (Vite).
  - Make the search bar + display current weather (basic fetch).
  - Create a repository and push your work.
  - Create GitHub pages.
- **Phase 2 — Data Fetching:**
  - Implement current weather first.
  - Implement 7-day forecast.
  - Implement hourly forecast.
  - Add unit toggling (C/F, mph/kmh, etc.) for temperature, "feels like", min/max, hourly forecast, wind, and precipitation.
  - Use `useEffect` + state hooks to fetch data based on:
    - Current location.
    - Selected day (for hourly forecast).
    - Selected unit system.
- **Phase 3 — UI/UX:**
  - Apply styling based on the Figma file.
  - Add hover/focus states.
  - Make it responsive (mobile-first).
- **Phase 4 — Polish & Deploy:**
  - Add error handling (e.g., "Location not found").
  - Add loading indicators.
  - Clean code (break into components).
- **Phase 5 — Submission Check-ups:**
  - Live website check.
  - Readme file (hey, you're reading it!).
  - Submission details and requirements.

#### Self-Improvement Tips (for myself!):

- **Make small commits** — one feature at a time.
- **Don’t overthink architecture**; a few components and states are fine.

#### What Data Do We Need?

- **Current Weather:**
  - Location from user input ✅
  - Today's day and date ✅
  - Temperature ✅
  - Is it day (sun) or night (moon)? ✅
  - "Feels like" temperature ✅
  - Humidity ✅
  - Wind ✅
  - Precipitation ✅
- **Daily Forecast (7 days):**
  - Day name ✅
  - Icon (❓ what are these based on?)
  - Min & Max temperature ✅
- **Hourly Forecast (this hour + next 5):**
  - Icon (❓ what are these based on?)
  - Hour ✅
  - AM or PM ('isDay') ✅
  - Temperature ✅

#### What Can the User Do?

- Search location. ✅
- Change the unit of measurement. ✅
- Change the day in the hourly forecast (list is always Mon-Sun). (❓ when a user changes the day to tomorrow, when does the hourly forecast start?)

---

### Sunday 14/9/2025

Back to Phase 1, focusing on setting up!

**Problem:** How do I send the city name to the weather API? It seems I need `lat` and `long`!

**Solution:** Shout out to [this YouTube video](https://youtu.be/HS7GfTuJgA8?si=7NG3ISO_ggvCPQEf)! There's another endpoint from Open-Meteo: **Geocoding**.

Here's the new plan for search:

- User enters a city.
- The Geocoding API returns one or multiple matching cities (just the city name for now).
- User chooses from a dropdown menu (e.g., "City, Country" format).
- Send the chosen city's `lat` and `long` to the main Open-Meteo API.

---

### 17/9/2025 Wednesday

Into Phase 2: Data Fetching!

- Implement current weather first. ✅
- Implement 7-day forecast. ✅
- Implement hourly forecast. ✅
- Add unit toggling (C/F, mph/kmh, etc.).
- Use `useEffect` + state hooks to fetch data based on:
  - Current location [user input search] ✅
  - Selected day - hourly [when the user changes the day in hourly]
  - Selected unit system [when the user changes the unit of any data]

#### Small Wins & Notes:

- Had to turn on **timezone auto-detection** in the API request because `is_day` was often incorrect.
- For daily forecast dates, converting the `time` attribute into day labels: `toLocaleDateString` method was the savior. Used it for current weather too!

#### What's Left?

- **Daily Forecast (7 days):**
  - Icon (❓ what are the icons based on?)
- **Hourly Forecast (this hour + 5):**
  - Icon (❓ what are the icons based on?)
- **Functionalities:**
  - Change the unit of measurement.
  - Change the day in hourly forecast (dropdown Mon-Sun). (❓ when a user changes the day in hourly to tomorrow, when does it start?)

**AHA!** The icons are based on **WMO codes**! Found the mapping [here](https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c#file-descriptions-json).

---

### Tuesday 30/9/2025

Only 6 days left until submission, and I'm a bit behind, but the push is real! 💪

#### **Problem:** Unit Systems

**Q:** What can users do/change?
**A:** Either the whole unit system (metric/imperial) or an individual measure (e.g., just change wind speed).

**Notes:** Changing the system should reflect on individual inputs, but not vice versa. Also, the API doesn't accept "metric units" as a single param; you have to specify each unit.

#### **Steps for Unit Toggling:**

1.  **Switching Unit Systems:**
    - Add radio inputs for Metric/Imperial.
    - Update a `unitSystem` state accordingly.
    - Add corresponding params to the API request (`temperature_unit`, `wind_speed_unit`, etc.).
    - Update UI to reflect changes.
2.  **Integrate Switching Individual Units:**
    - **Q:** Do we need different states for each unit, or can we use the same `unitSystem` state?
    - **A:** We need a different state for **each measurement** since the user can change, say, only the temperature unit.
    - Add inputs for each measure (e.g., a dropdown for `temperature_unit`).
    - Handle change by updating its specific state.
    - Refetch with a dynamic URL.
3.  **Integration (System vs. Individual Priority):**
    - When the user switches between Metric/Imperial, reflect those changes on the individual measurement inputs (e.g., if Metric is chosen, set individual temperature unit to Celsius).
    - **Q:** With multiple states (`unitSystem` and individual units), what's the UI's source of truth? How do we avoid conflicts?
    - **A:** Had to add another value: `'custom'` to the `unitSystem` state. This state equals `'custom'` only if the user changes a unit for one of the measurements, overriding the overall Metric/Imperial setting. This prevents conflicts and gives individual changes priority.
4.  **The Dynamic URL:**
    - Start with a `baseUrl` for fetching city data with **default** units.
    - Create an array (`params`) to add user's unit selections.
    - Every time a unit state changes (either system or individual), push the corresponding unit into the `params` array, building the dynamic API call.

---

### Hourly Forecast Deep Dive

**Q:** Is there a way to limit the hours displayed for each day? What makes more sense for user experience: displaying the current hour + 11pm for today, and then for other days starting from 12 AM?

**A:** Yes! This gives users immediate, relevant information for "right now" while providing a complete overview for future planning.

**Steps to achieve this:**

- **Get Today's Date:** Need today's date in `YYYY-MM-DD` format.
- **Apply Conditional Filtering:** If the selected day is today, filter out past hours and slice to show current + until 11pm. Otherwise, use the full 24-hour list for future days.

#### **Problem:** Why do future days start at 3 AM instead of 12 AM?

**Explanation:** My filtering logic was based on `item.time.toISOString().startsWith(selectedDay)`. `toISOString()` converts the `Date` object to a **UTC string**. If Riyadh (UTC+3) 12:00 AM Oct 3rd is `2025-10-02T21:00:00.000Z` in UTC, then `item.time.toISOString()` returns `"2025-10-02..."`. My filter, checking for `"2025-10-03"`, was returning `false` for the first three hours of the day, making it seem like the day started at 3 AM.

**Solution:** Filter the hourly data based on the **local date** of the time entry.

- Used `toLocaleDateString('sv', ...)`: The Swedish locale code ('sv') is one of the most reliable ways in JavaScript to guarantee the output format is the ISO standard `YYYY-MM-DD`. This was crucial to correctly filter the hourly weather data, as it calculates the date based on the data's local time zone (not UTC), fixing the "future days start late" bug.

#### **Icon Logic:**

- **Daily forecast** icons are always for **daytime**.
- **Current** and **hourly** forecasts can have **nighttime** icons.

---

### Project Structure & Best Practices

**Q:** Do I need to separate `weather_codes` into different JSON files? Do I need to move components into different files?

**A:** Let's be honest, the deadline got very close and things escalated pretty fast over the last couple of days, so I had to make some practical decisions.

In a perfect world, I would have separated the weather_codes data and every single component (SearchBar, CurrentWeather, etc.) into its own file—that's the clean, best-practice way to do it. But given that this is a small, self-contained app, keeping everything in one App.jsx file was the most sensible choice to get it done on time.

---

### 🎨 Styling with Tailwind

I used the **CDN method** for setup instead of importing dependencies into `index.css`. Quick and effective!

---

### 🚨 Problem: Search is happening while typing!

**Solution:**

- Add a new state to track the live search term update.
- Implement a **Debounced effect** to fetch and search for cities only after the user stops typing for 300ms. This significantly improves user experience and reduces unnecessary API calls.

---

### Final Polish Notes:

- Removed the initial "Berlin" city default (so it doesn't trigger search dropdown on load) and cleared the selected location state (so it doesn't load Berlin data when the page first loads).
- **User Experience for Unit Toggling:**
  - When changing a _single measurement_, the unit settings dropdown stays open – good, allows the user to implement multiple tweaks.
  - When changing the _whole system_ (e.g., clicking "Imperial"), the dropdown closes – this makes sense. It's a major action, and closing provides clear feedback that the primary goal is complete. Also, it's a better user experience than making the user click extra to close it.

---

## 🛠️ Technologies Used
- **React** (Hooks: `useState`, `useEffect`)
- **Axios** for API requests
- **Tailwind** for styling
  
---

## 🌟 Live Demo

Check out the deployed project here: [Weather App Live Demo](https://weather-app-react-final-ghhwuqlko-dananb01s-projects.vercel.app/)

---

## 💡 Extra Function Ideas (Maybe Next Time!)

- Add **geolocation detection** to automatically show weather for the user's current location on first visit.
- Implement a **favorites/saved locations system** where users can bookmark frequently checked locations.
- Implement a **"Compare Locations"** feature to view weather side-by-side for multiple locations.
- Include **UV index, visibility, and air pressure data** (available via Open-Meteo).
- Add **sunrise/sunset times** with visual indicators.
- Add **animated weather backgrounds** that change based on current conditions.
- Implement **voice search functionality**.
- Create **dark/light mode themes** that adapt to the time of day.
- Add **progressive web app (PWA) capabilities** for mobile installation.
- More days to the 7-day forecast "slide" (the API supports more days ahead!).
