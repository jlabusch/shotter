# shotter

Web page screenshotting tool built on node-webshot and phantomjs.

# Usage

> `shotter [--width W] [--script foo.js] [--output out.jpg] URL`

# Options

  * **--output**: Name of output image file (Default: `screenshot_<timestamp>.jpg`)
  * **--script**: Custom script to be executed in the browser (Default: `default_script.js`)
  * **--width**: Virtual screen width (Default: 1024)

# Custom scripts

## Why?

Custom scripts allow you to set up specific scenarios before taking a screenshot. For example, logging in and navigating to a specific page. Many use cases won't require any custom scripting at all.

## What?

Custom scripts in `shotter` expose the node-webshot `script` option, which in turn uses the phantomjs `page.evaluate()` mechanism.

## How?

Scripts can either be a single function that takes no arguments and invokes `window.callPhantom("takeShot")` on completion, or a list of functions that trigger `window.callPhantom("next")` after each step and finish with `window.callPhantom("takeShot")`.

For a trivial example, look at `default_script.js`

```javascript
function(){ window.callPhantom('takeShot'); }
```

That script is the default action taken if no other scripts are specified. On the other hand, `cma.js` shows a more complex interaction:

```javascript
[
    function(){
        $("#signin_username_entry").val("USER");
        $("input[type='password']").val("PASS");
        $("form").submit();
        window.callPhantom("next");
    },
    function(){
        window.location.href = window.location.href.replace(/home\/?/, "section/ranking.html");
        window.callPhantom("next");
    },
    function(){
        $("#section-10 > a:nth-of-type(1)").eq(0).each(function(){
            toggle_section_subtree(this, false, {});
        });
        setTimeout(function(){ window.callPhantom("next"); }, 5000);
    },
    function(){
        var business = "27384";
        $("#section-" + business + " > a:nth-of-type(2)").eq(0).each(function(){
            s_s_c(this, business);
        });
        setTimeout(function(){ window.callPhantom("next"); }, 5000);
    },
    function(){
        setTimeout(function(){ window.callPhantom("takeShot"); }, 5000);
    }
]
```

# BSD License

GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt

