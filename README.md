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

Some screenshots: <br>
**1. This is polybar, and you can see the APM count up there** 
![image](https://github.com/circles-00/apm-tracker/assets/42126548/3e47516e-9c77-41d5-9ded-ec2021b2fd51)
**2. As well as some neovim action alongside the polybar**
![image](https://github.com/circles-00/apm-tracker/assets/42126548/fcc8af3f-1de4-451d-8e7d-5948872dbaf0)

To run the application, first you need to find out your keyboard id and mouse id, you can use `evtest` for it.
Once you have your keyboard id and mouse id, you need to send them to the script, let's say that the mouse id is 20 and the keyboard id is 20:

```shell
./dist/index.js 20 14
```

If you also want to have some more statistics, you can send the verbatim argument:

```shell
./dist/index.js 20 14 true
```

To use with polybar, add this to the polybar config (change the path of the script if needed):
```shell
[module/apm]
type = custom/script
exec = ~/.config/polybar/apm.js 20 14
tail = true
interval = 1
```

Then you can use the module anywhere you want, for example: 
```shell
modules-right = apm
```

You may also want to add some permissions to your root user to the files located in `/lib`, so they can be executed as root.

# TODO:
- [ ] Refine the README, it is written just to not forget how this project works, needs more work on the specifics.
