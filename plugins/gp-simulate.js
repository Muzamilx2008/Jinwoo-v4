let handler = async (m, { conn, usedPrefix, command, args: [event], text }) => {

  let chat = global.db.data.chats[m.chat]
  if (!chat.welcome) throw `✳️ To use this command you must activate Welcome messages with\n\n *${usedPrefix}on* welcome`

  let te = `
  ┌─⊷ *EVENTS*
  ▢ welcome
  ▢ bye
  ▢ promote
  ▢ demote
  └───────────

  📌 Example:
  
  *${usedPrefix + command}* welcome @user`

  if (!event) return await m.reply(te)

  let mentions = text.replace(event, '').trimStart()
  let who = mentions ? conn.parseMention(mentions) : []
  let part = who.length ? who : [m.sender]
  let act = false
  m.reply(`✅ Simulating ${event}...`)
  
  switch (event.toLowerCase()) {
    case 'add':
    case 'welcome':
    case 'invite':
      act = 'add'
      break

    case 'bye':
    case 'leave':
    case 'remove':
      act = 'remove'
      break

    case 'promote':
      act = 'promote'
      break

    case 'demote':
      act = 'demote'
      break

    default:
      throw te
  }

  if (act) return conn.participantsUpdate({
    id: m.chat,
    participants: part,
    action: act
  })
}

handler.help = ['simulate <event> @user']
handler.tags = ['group']
handler.command = ['simular', 'simulate']
handler.admin = true
handler.group = true

export default handler
