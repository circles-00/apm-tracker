# Actions Per Minute Tracker

## How to build

First clone this repository:

```shell
git clone git@github.com:circles-00/apm-tracker.git
```

Install needed packages:

```shell
yarn
```

Build:

```shell
yarn build
```

## How to use

You can use it as a CLI, or do something more creative with it, like using it with Polybar (I use it with polybar btw and it's awesome).

Some screenshots:

Insert some screenshots here

To run the application, first you need to find out your keyboard id and mouse id, you can use `evtest` for it.
Once you have your keyboard id and mouse id, you need to send them to the script, let's say that the mouse id is 20 and the keyboard id is 20:

```shell
./dist/index.js 20 14
```

If you also want to have some more statistics, you can send the verbatim argument:

```shell
./dist/index.js 20 14 true
```

You may also want to add some permissions to your root user to the files located in `/lib`, so they can be executed as root.