# EXPANDABLE BANNER

## Description

A simple banner that extends when you hover the mouse over it and shrink when the mouse exits.

## Installation

    npm i banner-expandable

## Usage

    import myBannerExpand from 'banner-expandable';
    let banner = myBannerExpand("banner", ["small-img", "big-img"]);

> constructor(divId, ressources, options=null)

| Name       | Value                    | Require | Type   | Description                                                |
|------------|--------------------------|---------|--------|------------------------------------------------------------|
| divId      | "bannerDivId"            | yes     | string | The name of the div ID where the banner will be show       |
| ressources | ["small-img", "big-img"] | yes     | array  | An array containing the two images displayed on the banner |
| options    | {"option1": true}        | no      | object | Some options to customize the module                       |

List of differents options :

| Option             | Value   | Description                                            | Default |
|--------------------|---------|--------------------------------------------------------|---------|
| elastic            | boolean | If the banner will extends with 'elastic' effect on it | false   |
| duration-animation | number  | The duration of the animation (in second)              | 1       |
