module.exports = {
    name: 'eval',
    perm: '4',
execute(client, message, args){
        function clean(text) {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }
        try {
            const code = args.join(" ");
            let evaled = eval(code);
       
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
       
            message.reply(clean(evaled), {code:"xl"});
          } catch (err) {
            message.reply(`:x: **Error :** \`\`\`xl\n${clean(err)}\n\`\`\``);
          }
}
}