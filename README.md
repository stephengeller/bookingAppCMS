# Booking App CMS

A content management system for a property booking app. Made by [Stephen Geller](http://www.stephengeller.co.uk).

## Quickstart Guide

To get this running locally on your system, follow the steps below. If you don't have `npm` installed, type `brew install npm` in your terminal (Mac users). Get Homebrew [here](https://brew.sh/) if you don't already have it.

In your terminal:

```bash
$ git clone git@github.com:stephengeller/bookingAppCMS.git
$ cd bookingAppCMS/client
$ npm install
$ npm start # will open on localhost:5000
```

## Features

#### `Add Property`

This tab allows users to add a property to an API, containing several details.

#### `Manage`

This tab allows users to manage their properties, including being able to delete and update them.

### Features to be completed:

    - User Authentication
    - Adding locations to properties
    - Adding available dates to properties
    - Property booking functionality

## Usage Warning

This app relies on an external API to use and manage properties. If you don't have an external API you can use with this app, you will not be able to see any properties on the "Manage" tab, and will not be able to successfully add any properties in the "Add Property" tab.
