var webshot = require('webshot'),
    getopt  = require('posix-getopt'),
    fs      = require('fs'),
    _       = require('underscore')._;

function die(msg){
    console.log(msg);
    process.exit(1);
}

function usage(m){
    die('usage: shotter [--width W] [--script foo.js] [--output out.jpg] www.google.com');
}

if (require.main === module){
    var parser = new getopt.BasicParser('s:(script)w:(width)o:(output)h(help)', process.argv);
    var option;
    var custom_script = 'default_script.js';
    var config = {
        save_as: undefined,
        width: 1024,
        script: undefined
    };
    while ((option = parser.getopt()) !== undefined){
        switch (option.option){
            case 'h':
                usage();
                break;
            case 's':
                custom_script = option.optarg;
                break;
            case 'o':
                config.save_as = option.optarg;
                break;
            case 'w':
                config.width = int_or_throw(option.optarg);
                break;
        }
    }
    config.save_as = config.save_as || 'screenshot_' + timestamp() + '.jpg';
    var url = process.argv[parser.optind()];
    if (!url){
        usage();
    }
    fs.readFile(custom_script, 'utf8', function(err, data){
        if (err){
            die('Error loading ' + custom_script + ' [[' + err + ']]');
        }
        config.script = data;
        take_screenshot(config, url);
    });
}

function timestamp(){
    var d = new Date();
    return d.getFullYear() + '-' +
          (d.getMonth()+1) + '-' +
           d.getDate() + '_' +
           d.getHours() + ':' +
           d.getMinutes() + ':' +
           d.getSeconds() + '.' +
           d.getMilliseconds();
}

function int_or_throw(n){
    n = parseInt(n);
    if (isNaN(n)){
        throw '"n" is not an integer';
    }
    return n;
}

function take_screenshot(conf, url){
    var options = {
        screenSize: {width: conf.width, height: 960},
        shotSize:   {width: conf.width, height: 'all'},
        script: conf.script,
        takeShotOnCallback: true,
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.4 (KHTML like Gecko) Chrome/22.0.1229.56 Safari/537.4'
    };
    webshot(
        url,
        conf.save_as,
        options,
        function(err){
            if (err){
                console.log('Error while grabbing ' + url + ' [[' + err + ']]');
            }else{
                console.log(url + ' => ' + conf.save_as);
            }
        }
    );
}


