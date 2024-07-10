# Fraud NPM

![node](https://img.shields.io/badge/node-20.13.0-339933?logo=nodedotjs)
![Publish Main](https://github.com/govuk-one-login/fraud-npm/actions/workflows/publish.yaml/badge.svg?branch=main)

![Events version](https://img.shields.io/github/package-json/v/govuk-one-login/fraud-npm?filename=events%2Fpackage.json&label=events%20version)
![Logging package.json version](https://img.shields.io/github/package-json/v/govuk-one-login/fraud-npm?filename=logging%2Fpackage.json&label=logging%20version)

This repository contains packages that are designed to be reusable across multiple other repositories.

## Packages

The packages in this repository are detailed further below:

- [Events Package](events/README.md)
- [Logging Package](logging/README.md)

## Development Environment Set Up

To set your environment up for local development and deployment, follow the guide
[here](https://govukverify.atlassian.net/wiki/x/J4AS-g)

## Publishing a new package version

To publish a new version of a package, increase the package's version number in the version field at the top-level
of the `package.json` file, and then check this file in to the branch to publish, or merge this file to the branch
to publish (typically the `main` branch).

Then, go to the fraud-npm repo in GitLab, select the `Actions` tab, and click on the `Publish` action in the list on the
left-hand side. Then, click on the `Run workflow` button in the upper right-hand corner and, in the resultant dialog,
specify the branch to publish from, and the package to publish, and then click on the `Run workflow` button to publish
the package to the One Login package repository.

> [!TIP]
> packages will normally be published from main after a merge.

## Adding a new package

To add a new package, do the following:

- add the new package to the top-level of the fraud-npm project;
- add the new package to the publish.yaml workflow action. This action allows the user to choose from a drop-down of
  packages to publish;
- go to the fraud-npm repo in GitHub, choose your new package from the packages list in the bottom-right of the screen,
  then choose Package Settings from the bottom-right, and then add all the repositories you would like to be able to
  access your new package to the list in the "Manage Actions access" section.
