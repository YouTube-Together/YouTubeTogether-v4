module.exports = {
    name: 'say',
    perm: '5',

execute(client, message, args){
    message.delete()
    message.channel.send(args.join(" ")) 
}
}