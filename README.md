# Polskie Dzbany

Polskie Dzbany is a node.js app about stereotypical polish drivers.

## Why would you do an app about _that_?

In Poland, there are plenty of stereotypes about drivers in particular cars. E. g. "BMW/Audi/Mercedes drivers are punks, who cause a lot of accidents," "Skoda drivers are mostly Ubers and can't drive at all," etc.. My dear friend works at a major premium car manufacturer. I often made plenty of fun of him because of these stereotypes. But, what if I could prove or disprove that the cars that he helps to manufacture are more often bought by a "dzban" (which in Polish literary translates to a water-jug but really means an idiot). What if I could do it for all of the most popular car brands that drive on Polish streets? Well, since I'm pretty new to programming, I decided to utilise that knowledge and try to get some anecdotal evidence about that.

## How do you want to prove or disprove anything?

The app compares two sets of data:

1. The number of first registrations of cars, depending on the brand. This data is rather reliable, since Poland offers a [CEPiK API](https://api.cepik.gov.pl/doc), which has all the historical data up to late 2019. Not sure why they don't have the most recent data, but I'll have to live with that.
2. The number of times that drivers' of particular vehicles broke the law (and, in most cases, caused an accident) on the "Polskie Drogi" and "Stop Cham" YouTube channels. This is a combination of work and pleasure - watching the entertaining videos but also writing down how many instances of law breaking occurred for each car brand.

## High-level overview of the app.

![diagram-1](https://user-images.githubusercontent.com/85575391/127466524-ab01cf80-7944-4d99-87e9-79aae887de14.png)

## I don't get it. Can you give me an example?

So, we've got the total number of cars / accidents and the same number according to brand. So, we get percentages, e.g.:

The number of cars:
- Audi - 15% of the total number of cars
- BMW - 15%
- Citroen - 20%
- Dacia - 20%
- Fiat - 10%
etc.

Then we take the percentage of accidents/incidents caused by drivers of these same brands:
- Audi - 12% of the total number of accidents
- BMW - 16%
- Citroen - 18%
- Dacia - 22%
- Fiat - 10%

So, the jug-o-meter (aka. Współczynnik Dzbana) is the following for the above brands:
- Audi: -3%
- BMW: +1%
- Citroen: -2%
- Dacia: +2%
- Fiat: 0%

Therefore, we can conclude that Dacia drivers are statistically the most irresponsible and Audi drivers are the most responsible.

## That's not really a reliable outcome, though.

It sure is not. We'd have to have access to police data of accidents and I don't even know if these kinds of statistics include car brands, let alone if they are publicly available. But this project is for fun and for the sake of learning to code.

## Can I clone and run the app?

Nope, unfortunately you'd need to have access to the data of my email server and a MongoDB database.

## Alright, I get it. But how does it all work?

The car data is taken from the CEPiK database by a separate program, which source files can be viewed [here](https://github.com/matt-jb/get-cars). The accidents/incidents data is uploaded through the web app by admin users. Every user can leave a comment under any episode, indicating where the admins made an error.

### Feature list:
- Displaying the data, which includes:
  - Displaying the Współczynnik Dzbana (jug-o-meter)
  - Displaying the episode data and comments
- Creating a user account (with server-side validation)
- Logging in and out
- Editing existing user data
- Resetting lost password
- Changing password
- Displaying flashes of two types
- Uploading episode data
- Editing existing episode data
- Adding comments

## TODO list:

Might work on these things to make the project at least half-decent:

[ ] Re-doing the backend in order to make the front-end more readable. Particularly, dividing the data into three sections: lowest jug-o-meter, highest jug-o-meter and the rest.
[ ] Changing the "wspolczynnikDzbana" variable name.
[ ] Calculating the jug-o-meter during the DB-query pipeline, not on the client-side.
[ ] Color-coding the "wspolczynnikDzbana", so that it's more visible that the negative score is a desirable one.
[ ] Preventing people from making accounts with the same username.
[ ] Adding sorting of lists.
