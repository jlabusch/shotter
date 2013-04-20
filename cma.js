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
