## Context

A property developer's internal security workflows ran in 1C. The task was to move them into a web backoffice used by several departments with different access rights.

## My contribution

I designed and implemented the backoffice, its role model, and access controls. I moved accreditation workflows for legal entities, individuals, government bodies, and foreign companies into the web application.

I added integrations with public company databases to automate counterparty checks, and implemented in-browser previews for documents including Word and Excel files.

## Working within constraints

The project restricted the use of external libraries. I built a custom HTTP client, authentication, and a query caching layer for the backoffice.

That constraint is part of the engineering decision. The custom implementation was a response to a specific project environment, rather than a general recommendation to replace established libraries.

## What connects this work

The backoffice brought together user workflows, access rights, documents, and external data sources. Building its interface required understanding the counterparty verification process and the differences between departments.

## Outcome

Accreditation workflows moved from 1C into a web application with role-based access, public database checks, and document previews. My contribution covered the design and implementation of the backoffice and its application-side request infrastructure.

The public case can explain the problem and decisions without exposing internal documents, real records, or screenshots containing employee information.
