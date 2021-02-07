function consoleOpenCallback() {
    document.body.innerHTML='反调试';
    window.close();
    window.location = "about:blank";
}

setInterval(function () {
    const before = new Date();
    (function(){}).constructor("debugger")();
    // debugger;
    const after = new Date();
    const cost = after.getTime() - before.getTime();
    if (cost > 100) {
        consoleOpenCallback();
    }
}, 1000);

console.log('你是湖北人');
alert('测试');