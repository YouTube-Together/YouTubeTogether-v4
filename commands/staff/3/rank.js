const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: 'rank',
    perm: '3',
execute(client, message, args){
    let method = args[0]
    let user = args[1]
    let rank = args[2]
    let authorperm = db.get(`${message.member.user.id}.rank.level`)
    if (!user) return message.reply(':x: **Error :** Please, specify the user id')
    if (isNaN(user)) return message.reply(':x: **Error :** Please, specify the user id')
    if (!rank) return message.reply(':x: **Error :** Please, specify the rank')
    if (isNaN(rank)) return message.reply(':x: **Error :** Please, specify the rank')

    if (method === "set"){
        client.users.fetch(user).then((usr) => {
            if (rank === '1') {
                if (authorperm > rank) return message.reply(':x: **Error :** You d\'ont have the right permissions')
                db.set(`${usr.id}.rank.level`, rank)
                message.reply(`:white_check_mark: Permission **1 - Owner** added to **${usr.tag}**`)
            }
            if (rank === '2') {
                if (authorperm >= rank) return message.reply(':x: **Error :** You d\'ont have the right permissions')
                db.set(`${usr.id}.rank.level`, rank)
                message.reply(`:white_check_mark: Permission **2 - Admin** added to **${usr.tag}**`)
            }
            if (rank === '3') {
                if (authorperm >= rank) return message.reply(':x: **Error :** You d\'ont have the right permissions')
                db.set(`${usr.id}.rank.level`, rank)
                message.reply(`:white_check_mark: Permission **3 - Manager** added to **${usr.tag}**`)
            }
            if (rank === '4') {
                db.set(`${usr.id}.rank.level`, rank)
                message.reply(`:white_check_mark: Permission **4 - Developer** added to **${usr.tag}**`)
            }
            if (rank === '5') {
                db.set(`${usr.id}.rank.level`, rank)
                message.reply(`:white_check_mark: Permission **5 - Moderator** added to **${usr.tag}**`)
            }
            if (rank === '6') {
                db.set(`${usr.id}.rank.level`, rank)
                message.reply(`:white_check_mark: Permission **6 - Bug hunter** added to **${usr.tag}**`)
            }
            if (rank === '7') {
                db.set(`${usr.id}.rank.level`, rank)
                message.reply(`:white_check_mark: Permission **7 - V.I.P** added to **${usr.tag}**`)
            }
            if (rank === '8') {
                db.set(`${usr.id}.rank.level`, rank)
                message.reply(`:white_check_mark: Permission **8 - Premium** added to **${usr.tag}**`)
            }
        })
    }
    if (method === "remove"){
        client.users.fetch(user).then((usr) => {
            if (rank === '1') {
                if (authorperm < rank) return message.reply(':x: **Error :** You d\'ont have the right permissions')
                if (db.get(`${usr.id}.rank.level`) == rank) return message.reply(':x: Error :** This user doesn\'t have the permission **1 - Owner**')
                db.delete(`${usr.id}.rank.level`)
                message.reply(`:white_check_mark: Permission **1 - Owner** removed from **${usr.tag}**`)
            }
            if (rank === '2') {
                if (authorperm <= rank) return message.reply(':x: **Error :** You d\'ont have the right permissions')
                if (db.get(`${usr.id}.rank.level`) == rank) return message.reply(':x: Error :** This user doesn\'t have the permission **2 - Admin**')
                db.delete(`${usr.id}.rank.level`)
                message.reply(`:white_check_mark: Permission **2 - Admin** removed from **${usr.tag}**`)
            }
            if (rank === '3') {
                if (authorperm <= rank) return message.reply(':x: **Error :** You d\'ont have the right permissions')
                if (db.get(`${usr.id}.rank.level`) == rank) return message.reply(':x: Error :** This user doesn\'t have the permission **3 - Manager**')
                db.delete(`${usr.id}.rank.level`)
                message.reply(`:white_check_mark: Permission **3 - Manager** removed from **${usr.tag}**`)
            }
            if (rank === '4') {
                if (db.get(`${usr.id}.rank.level`) == rank) return message.reply(':x: Error :** This user doesn\'t have the permission **4 - Developer**')
                db.delete(`${usr.id}.rank.level`)
                message.reply(`:white_check_mark: Permission **4 - Developer** removed from **${usr.tag}**`)
            }
            if (rank === '5') {
                if (db.get(`${usr.id}.rank.level`) == rank) return message.reply(':x: Error :** This user doesn\'t have the permission **5 - Moderator**')
                db.delete(`${usr.id}.rank.level`)
                message.reply(`:white_check_mark: Permission **5 - Moderator** removed from **${usr.tag}**`)
            }
            if (rank === '6') {
                if (db.get(`${usr.id}.rank.level`) == rank) return message.reply(':x: Error :** This user doesn\'t have the permission **6 - Bug Hunter**')
                db.delete(`${usr.id}.rank.level`)
                message.reply(`:white_check_mark: Permission **6 - Bug Hunter** removed from **${usr.tag}**`)
            }
            if (rank === '7') {
                if (db.get(`${usr.id}.rank.level`) == rank) return message.reply(':x: Error :** This user doesn\'t have the permission **7 - V.I.P**')
                db.delete(`${usr.id}.rank.level`)
                message.reply(`:white_check_mark: Permission **7 - V.I.P** removed from **${usr.tag}**`)
            }
            if (rank === '8') {
                if (db.get(`${usr.id}.rank.level`) == rank) return message.reply(':x: Error :** This user doesn\'t have the permission **8 - Premium**')
                db.delete(`${usr.id}.rank.level`)
                message.reply(`:white_check_mark: Permission **8 - Premium** removed from **${usr.tag}**`)
            } 
        })
    }
}
}


