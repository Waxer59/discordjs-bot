const decisionsAlternatives = [
  'Absolutely not',
  'No',
  'Maybe',
  'Not sure',
  'Yes!',
  'Absolutely yes!',
  'Likely',
  'Unlikely',
  'Very likely',
  'Not likely',
  'Possible',
  'Improbable',
  'Never',
  'Impossible',
  'Certainly',
  'Definitely not',
  "I'm certain",
  "I'm not certain"
]

const emojis = [
  '😄',
  '😃',
  '😀',
  '😊',
  '☺',
  '😉',
  '😍',
  '😘',
  '😚',
  '😗',
  '😙',
  '😜',
  '😝',
  '😛',
  '😳',
  '😁',
  '😔',
  '😌',
  '😒',
  '😞',
  '😣',
  '😢',
  '😂',
  '😭',
  '😪',
  '😥',
  '😰',
  '😅',
  '😓',
  '😩',
  '😫',
  '😨',
  '😱',
  '😠',
  '😡',
  '😤',
  '😖',
  '😆',
  '😋',
  '😷',
  '😎',
  '😴',
  '😵',
  '😲',
  '😟',
  '😦',
  '😧',
  '😈',
  '👿',
  '😮',
  '😬',
  '😐',
  '😕',
  '😯',
  '😶',
  '😇',
  '😏',
  '😑',
  '👲',
  '👳',
  '👮',
  '👷',
  '💂',
  '👶',
  '👦',
  '👧',
  '👨',
  '👩',
  '👴',
  '👵',
  '👱',
  '👼',
  '👸',
  '😺',
  '😸',
  '😻',
  '😽',
  '😼',
  '🙀',
  '😿',
  '😹',
  '😾',
  '👹',
  '👺',
  '🙈',
  '🙉',
  '🙊',
  '💀',
  '👽',
  '💩',
  '🔥',
  '✨',
  '🌟',
  '💫',
  '💥',
  '💢',
  '💦',
  '💧',
  '💤',
  '💨',
  '👂',
  '👀',
  '👃',
  '👅',
  '👄',
  '👍',
  '👎',
  '👌',
  '👊',
  '✊',
  '✌',
  '👋',
  '✋',
  '👐',
  '👆',
  '👇',
  '👉',
  '👈',
  '🙌',
  '🙏',
  '☝',
  '👏',
  '💪',
  '🚶',
  '🏃',
  '💃',
  '👫',
  '👪',
  '👬',
  '👭',
  '💏',
  '💑',
  '👯',
  '🙆',
  '🙅',
  '💁',
  '🙋',
  '💆',
  '💇',
  '💅',
  '👰',
  '🙎',
  '🙍',
  '🙇',
  '🎩',
  '👑',
  '👒',
  '👟',
  '👞',
  '👡',
  '👠',
  '👢',
  '👕',
  '👔',
  '👚',
  '👗',
  '🎽',
  '👖',
  '👘',
  '👙',
  '💼',
  '👜',
  '👝',
  '👛',
  '👓',
  '🎀',
  '🌂',
  '💄',
  '💛',
  '💙',
  '💜',
  '💚',
  '❤',
  '💔',
  '💗',
  '💓',
  '💕',
  '💖',
  '💞',
  '💘',
  '💌',
  '💋',
  '💍',
  '💎',
  '👤',
  '👥',
  '💬',
  '👣',
  '💭',
  '🐶',
  '🐺',
  '🐱',
  '🐭',
  '🐹',
  '🐰',
  '🐸',
  '🐯',
  '🐨',
  '🐻',
  '🐷',
  '🐽',
  '🐮',
  '🐗',
  '🐵',
  '🐒',
  '🐴',
  '🐑',
  '🐘',
  '🐼',
  '🐧',
  '🐦',
  '🐤',
  '🐥',
  '🐣',
  '🐔',
  '🐍',
  '🐢',
  '🐛',
  '🐝',
  '🐜',
  '🐞',
  '🐌',
  '🐙',
  '🐚',
  '🐠',
  '🐟',
  '🐬',
  '🐳',
  '🐋',
  '🐄',
  '🐏',
  '🐀',
  '🐃',
  '🐅',
  '🐇',
  '🐉',
  '🐎',
  '🐐',
  '🐓',
  '🐕',
  '🐖',
  '🐁',
  '🐂',
  '🐲',
  '🐡',
  '🐊',
  '🐫',
  '🐪',
  '🐆',
  '🐈',
  '🐩',
  '🐾',
  '💐',
  '🌸',
  '🌷',
  '🍀',
  '🌹',
  '🌻',
  '🌺',
  '🍁',
  '🍃',
  '🍂',
  '🌿',
  '🌾',
  '🍄',
  '🌵',
  '🌴',
  '🌲',
  '🌳',
  '🌰',
  '🌱',
  '🌼',
  '🌐',
  '🌞',
  '🌝',
  '🌚',
  '🌑',
  '🌒',
  '🌓',
  '🌔',
  '🌕',
  '🌖',
  '🌗',
  '🌘',
  '🌜',
  '🌛',
  '🌙',
  '🌍',
  '🌎',
  '🌏',
  '🌋',
  '🌌',
  '🌠',
  '⭐',
  '☀',
  '⛅',
  '☁',
  '⚡',
  '☔',
  '❄',
  '⛄',
  '🌀',
  '🌁',
  '🌈',
  '🌊',
  '🎍',
  '💝',
  '🎎',
  '🎒',
  '🎓',
  '🎏',
  '🎆',
  '🎇',
  '🎐',
  '🎑',
  '🎃',
  '👻',
  '🎅',
  '🎄',
  '🎁',
  '🎋',
  '🎉',
  '🎊',
  '🎈',
  '🎌',
  '🔮',
  '🎥',
  '📷',
  '📹',
  '📼',
  '💿',
  '📀',
  '💽',
  '💾',
  '💻',
  '📱',
  '☎',
  '📞',
  '📟',
  '📠',
  '📡',
  '📺',
  '📻',
  '🔊',
  '🔉',
  '🔈',
  '🔇',
  '🔔',
  '🔕',
  '📢',
  '📣',
  '⏳',
  '⌛',
  '⏰',
  '⌚',
  '🔓',
  '🔒',
  '🔏',
  '🔐',
  '🔑',
  '🔎',
  '💡',
  '🔦',
  '🔆',
  '🔅',
  '🔌',
  '🔋',
  '🔍',
  '🛁',
  '🛀',
  '🚿',
  '🚽',
  '🔧',
  '🔩',
  '🔨',
  '🚪',
  '🚬',
  '💣',
  '🔫',
  '🔪',
  '💊',
  '💉',
  '💰',
  '💴',
  '💵',
  '💷',
  '💶',
  '💳',
  '💸',
  '📲',
  '📧',
  '📥',
  '📤',
  '✉',
  '📩',
  '📨',
  '📯',
  '📫',
  '📪',
  '📬',
  '📭',
  '📮',
  '📦',
  '📝',
  '📄',
  '📃',
  '📑',
  '📊',
  '📈',
  '📉',
  '📜',
  '📋',
  '📅',
  '📆',
  '📇',
  '📁',
  '📂',
  '✂',
  '📌',
  '📎',
  '✒',
  '✏',
  '📏',
  '📐',
  '📕',
  '📗',
  '📘',
  '📙',
  '📓',
  '📔',
  '📒',
  '📚',
  '📖',
  '🔖',
  '📛',
  '🔬',
  '🔭',
  '📰',
  '🎨',
  '🎬',
  '🎤',
  '🎧',
  '🎼',
  '🎵',
  '🎶',
  '🎹',
  '🎻',
  '🎺',
  '🎷',
  '🎸',
  '👾',
  '🎮',
  '🃏',
  '🎴',
  '🀄',
  '🎲',
  '🎯',
  '🏈',
  '🏀',
  '⚽',
  '⚾',
  '🎾',
  '🎱',
  '🏉',
  '🎳',
  '⛳',
  '🚵',
  '🚴',
  '🏁',
  '🏇',
  '🏆',
  '🎿',
  '🏂',
  '🏊',
  '🏄',
  '🎣',
  '☕',
  '🍵',
  '🍶',
  '🍼',
  '🍺',
  '🍻',
  '🍸',
  '🍹',
  '🍷',
  '🍴',
  '🍕',
  '🍔',
  '🍟',
  '🍗',
  '🍖',
  '🍝',
  '🍛',
  '🍤',
  '🍱',
  '🍣',
  '🍥',
  '🍙',
  '🍘',
  '🍚',
  '🍜',
  '🍲',
  '🍢',
  '🍡',
  '🍳',
  '🍞',
  '🍩',
  '🍮',
  '🍦',
  '🍨',
  '🍧',
  '🎂',
  '🍰',
  '🍪',
  '🍫',
  '🍬',
  '🍭',
  '🍯',
  '🍎',
  '🍏',
  '🍊',
  '🍋',
  '🍒',
  '🍇',
  '🍉',
  '🍓',
  '🍑',
  '🍈',
  '🍌',
  '🍐',
  '🍍',
  '🍠',
  '🍆',
  '🍅',
  '🌽',
  '🏠',
  '🏡',
  '🏫',
  '🏢',
  '🏣',
  '🏥',
  '🏦',
  '🏪',
  '🏩',
  '🏨',
  '💒',
  '⛪',
  '🏬',
  '🏤',
  '🌇',
  '🌆',
  '🏯',
  '🏰',
  '⛺',
  '🏭',
  '🗼',
  '🗾',
  '🗻',
  '🌄',
  '🌅',
  '🌃',
  '🗽',
  '🌉',
  '🎠',
  '🎡',
  '⛲',
  '🎢',
  '🚢',
  '⛵',
  '🚤',
  '🚣',
  '⚓',
  '🚀',
  '✈',
  '💺',
  '🚁',
  '🚂',
  '🚊',
  '🚉',
  '🚞',
  '🚆',
  '🚄',
  '🚅',
  '🚈',
  '🚇',
  '🚝',
  '🚋',
  '🚃',
  '🚎',
  '🚌',
  '🚍',
  '🚙',
  '🚘',
  '🚗',
  '🚕',
  '🚖',
  '🚛',
  '🚚',
  '🚨',
  '🚓',
  '🚔',
  '🚒',
  '🚑',
  '🚐',
  '🚲',
  '🚡',
  '🚟',
  '🚠',
  '🚜',
  '💈',
  '🚏',
  '🎫',
  '🚦',
  '🚥',
  '⚠',
  '🚧',
  '🔰',
  '⛽',
  '🏮',
  '🎰',
  '♨',
  '🗿',
  '🎪',
  '🎭',
  '📍',
  '🚩',
  '⬆',
  '⬇',
  '⬅',
  '➡',
  '🔠',
  '🔡',
  '🔤',
  '↗',
  '↖',
  '↘',
  '↙',
  '↔',
  '↕',
  '🔄',
  '◀',
  '▶',
  '🔼',
  '🔽',
  '↩',
  '↪',
  'ℹ',
  '⏪',
  '⏩',
  '⏫',
  '⏬',
  '⤵',
  '⤴',
  '🆗',
  '🔀',
  '🔁',
  '🔂',
  '🆕',
  '🆙',
  '🆒',
  '🆓',
  '🆖',
  '📶',
  '🎦',
  '🈁',
  '🈯',
  '🈳',
  '🈵',
  '🈴',
  '🈲',
  '🉐',
  '🈹',
  '🈺',
  '🈶',
  '🈚',
  '🚻',
  '🚹',
  '🚺',
  '🚼',
  '🚾',
  '🚰',
  '🚮',
  '🅿',
  '♿',
  '🚭',
  '🈷',
  '🈸',
  '🈂',
  'Ⓜ',
  '🛂',
  '🛄',
  '🛅',
  '🛃',
  '🉑',
  '㊙',
  '㊗',
  '🆑',
  '🆘',
  '🆔',
  '🚫',
  '🔞',
  '📵',
  '🚯',
  '🚱',
  '🚳',
  '🚷',
  '🚸',
  '⛔',
  '✳',
  '❇',
  '❎',
  '✅',
  '✴',
  '💟',
  '🆚',
  '📳',
  '📴',
  '🅰',
  '🅱',
  '🆎',
  '🅾',
  '💠',
  '➿',
  '♻',
  '♈',
  '♉',
  '♊',
  '♋',
  '♌',
  '♍',
  '♎',
  '♏',
  '♐',
  '♑',
  '♒',
  '♓',
  '⛎',
  '🔯',
  '🏧',
  '💹',
  '💲',
  '💱',
  '©',
  '®',
  '™',
  '〽',
  '〰',
  '🔝',
  '🔚',
  '🔙',
  '🔛',
  '🔜',
  '❌',
  '⭕',
  '❗',
  '❓',
  '❕',
  '❔',
  '🔃',
  '🕛',
  '🕧',
  '🕐',
  '🕜',
  '🕑',
  '🕝',
  '🕒',
  '🕞',
  '🕓',
  '🕟',
  '🕔',
  '🕠',
  '🕕',
  '🕖',
  '🕗',
  '🕘',
  '🕙',
  '🕚',
  '🕡',
  '🕢',
  '🕣',
  '🕤',
  '🕥',
  '🕦',
  '✖',
  '➕',
  '➖',
  '➗',
  '♠',
  '♥',
  '♣',
  '♦',
  '💮',
  '💯',
  '✔',
  '☑',
  '🔘',
  '🔗',
  '➰',
  '🔱',
  '🔲',
  '🔳',
  '◼',
  '◻',
  '◾',
  '◽',
  '▪',
  '▫',
  '🔺',
  '⬜',
  '⬛',
  '⚫',
  '⚪',
  '🔴',
  '🔵',
  '🔻',
  '🔶',
  '🔷',
  '🔸',
  '🔹'
]

const rockPaperScissors = ['Rock! 🪨', 'Paper! 📜', 'Scissors! ✂️']

module.exports = {
  decisionsAlternatives,
  emojis,
  rockPaperScissors
}
