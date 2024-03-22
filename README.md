# Fraud NPM

This repository contains packages that are designed to be reusable across multiple other repositories. 
Currently, it contains packages for logging and handling fraud events.

## Packages

### 1. Events Package

The events package contains services that validate, construct and reformat SETs. A SET is a fraud signal in the standard
One Login format, which is an extension of the OpenID shared signals format. The One Login format for SETs is defined 
here: https://github.com/govuk-one-login/architecture/blob/main/rfc/0052-shared-signals-data-spec.md

The Events package offers the following services:

- __map service__. This returns the Event class that matches a given URI or event type;
- __populated-set service__. This returns a populated subject event given an event type. 
- __reformat service__. This maps an inbound event to the TxMA message schema and validates required fields. The format 
of TxMA messages is defined here: 
https://govukverify.atlassian.net/wiki/spaces/Architecture/pages/3650519041/Inbound+Event+Field+Mapping+to+TXMA+Audit+Structure;
- __validate service__. This validates a given SET against a given JSON schema.

### 2. Logging Package

The Logging package extends the Logging package in Powertools for AWS Lambda. The package allows messages to be logged 
at debug, info, warning, error, critical levels, and also allows metrics to be logged. Metrics are logged in Amazon 
CloudWatch Embedded Metric Format (EMF).

### 3. Development Environment Set Up

Setup your environment using the following tools:

- VS Code - [Install VS Code](https://code.visualstudio.com/download)
- Node.js - [Install Node.js](https://nodejs.org/en/), including `npm`.

### 4. Local Development

Install `npm` dependencies:

```bash
npm i
```
### 5. Adding a new package

To add a new package, do the following:

- add the new package to the top-level of the fraud-npm project;
- add the new package to the publish.yaml workflow action. This action allows the user to choose from a drop-down of 
packages to publish;
- go to the fraud-npm repo in GitLab, choose your new package from the packages list in the bottom-right of the screen,
then choose Package Settings from the bottom-right, and then add all the repositories you would like to be able to
access your new package to the list in the "Manage Actions access" section.
