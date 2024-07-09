# The Events Package

![events-version](https://img.shields.io/badge/events_version-0.0.3-blue?logo=gitlab)

The events package contains services that validate, construct and reformat SETs (Security Event Tokens). A SET is a
fraud signal in the standard One Login format, which is an extension of the OpenID shared signals format. The One Login
format for SETs is defined here:

https://github.com/govuk-one-login/architecture/blob/main/rfc/0052-shared-signals-data-spec.md

The Events package offers the following services:

- **map service** - this returns the Event class that matches a given URI or event type;
- **populated-set service** - this returns a populated subject event given an event type.
- **reformat service** - this maps an inbound event to the TxMA message schema and validates required fields. The format
  of TxMA messages is defined here:
  https://govukverify.atlassian.net/wiki/spaces/Architecture/pages/3650519041/Inbound+Event+Field+Mapping+to+TXMA+Audit+Structure;
- **validate service** - this validates a given SET against a given JSON schema.
