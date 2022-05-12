---
sidebar_position: 1
---

# Why API Testing

## What is API Testing

API can be defined as writing some code in whatever programming language and asking for data to the API and then making sure that the data that arrive are in the format we expect and contains the information with a value we expect.

## What is an API

API is the acronym for Application Programming Interface, which is a software intermediary that allows two applications to talk to each other. Each time you use an app like Facebook, send an instant message, or check the weather on your phone, you’re using an API.

## API Example

When you use an application on your mobile phone, the application connects to the Internet and sends data to a server. The server then retrieves that data, interprets it, performs the necessary actions and sends it back to your phone. The application then interprets that data and presents you with the information you wanted in a readable way. This is what an API is - all of this happens via API.

To explain this better, let us take a familiar example.

Imagine you’re sitting at a table in a restaurant with a menu of choices to order from. The kitchen is the part of the “system” that will prepare your order. What is missing is the critical link to communicate your order to the kitchen and deliver your food back to your table. That’s where the waiter or API comes in. The waiter is the messenger – or API – that takes your request or order and tells the kitchen – the system – what to do. Then the waiter delivers the response back to you; in this case, it is the food.

Here is a real-life API example. You may be familiar with the process of searching flights online. Just like the restaurant, you have a variety of options to choose from, including different cities, departure and return dates, and more. Let us imagine that you’re booking you are flight on an airline website. You choose a departure city and date, a return city and date, cabin class, as well as other variables. In order to book your flight, you interact with the airline’s website to access their database and see if any seats are available on those dates and what the costs might be.

However, what if you are not using the airline’s website––a channel that has direct access to the information? What if you are using an online travel service, such as Kayak or Expedia, which aggregates information from a number of airline databases?

The travel service, in this case, interacts with the airline’s API. The API is the interface that, like your helpful waiter, can be asked by that online travel service to get information from the airline’s database to book seats, baggage options, etc. The API then takes the airline’s response to your request and delivers it right back to the online travel service, which then shows you the most updated, relevant information.

## Why We Should Automate The API Testing

It's important to test an API in order to make sure, as already said, that the data we're receiving from a request are as we expect and this aspect could be enough.

But if you ever use applications like postman or simply the browser a question that could come is: "Why should I write code to test an API if I can use these applications?"

Yes, it's true, you can verify that all is working using these applications but this is not enough.

Say you modify a route in the API that will add something in the database that is relevant also for all the other routes. Now, if we want to use Postman we can open a certain number of tabs and start writing requests checking manually that all the responses we obtain are as we expect...when suddenly a response is slightly or totally different from what we expect. Diligently we check the code, fix the bug and...now we have again to check all of this manually.

Moreover this was just to test a feature: what if we our API provides hundred of services?

This is where automated testing comes into play: we write code to check if a response to a call to a certain route is as we expect and if we modify something on the server we just run the code to check if all was as before or if we have some errors.
