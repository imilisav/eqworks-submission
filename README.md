> **DISCLAIMER:** The data presented in the website is fictional and should not be used for any real-world applications. This is merely for educational and testing purposes.

# EQ Works Submission

This is my [submission](https://imilisav.github.io/eqworks-submission) for problem 2A in my application for the Product Developer Role at EQ Works. This was a fun project to take on, I learned a lot!

## How to use the website

When you open the site, you'll be greeted by a map with markers and the name of the item that the marker is pointing to. These are points of interest containing information relating to that landmark, business, park, etc. 

When you click on one of those markers, you will see two types of data for this point of interest:
- Number of **events** hosted at this point of interest in a given timeframe
- Clicks, Impressions and Revenue **statistics** about the point of interest in a given timeframe

You will be able to view the data in a table, or visually in charts. Along with this data, you can refine it into daily, weekly, monthly and yearly versions of the data.

I have also provided the option to download this data as a csv file.

Overall, this site allows users to quickly find their points of interests, click on the marker and view the related data with a simple UI.

## My task for the submission

I was tasked to take the data from the [api I built in question 1](https://glitch.com/~eqworks-milisav-api-submission), and provide my interpretation of it through a front-end. 

There are three main goals that I needed to meet when making the site:
- Provide visuals for data based on the various statistics (this was done through my use of bar charts)
- Provide a more verbose form of data through tables
- Provide a map interface when browsing through points of interest since they are geographical locations

## Challenges Faced

Calling the API routes came with delays. I suspect that this has something with being on the free tier with Glitch. Nonetheless, this delay in response caused rendering issues, where components would fail to render because the component assumed that the data was present to display.

This forced me to re-think about every component's lifecycle and ensure that the components could render with or without data. When the data arrived, this would trigger a re-render and the appropriate data would display. 

A good example of this in action is the loading spinner when you start up the website. At this point, I am waiting on the API to provide me information about the points of interest, so I could render the map with markers as opposed to rendering an empty map, potentially confusing the user.
