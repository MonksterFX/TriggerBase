# TriggerBase

Lightwight extensible sheduling database for events with Node.js, Sqlite

## process

- add trigger via express rest api into the database
- check for new triggers

## trigger

A trigger contains the following fields:

- **id**: internal database id
- **name**: name of the trigger
- **executeAt**: execution time
- **message**: JSON formated message to use in extension execution

## SimpleHttpExtension

The standard extension is executed each time a trigger has surpassed its execution time. The trigger will be deleted after it has been successfully execution.

## enviroment variables

tbd.

## deploy on docker

tbd.
