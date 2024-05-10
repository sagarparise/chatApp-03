export const funEmojis = [
	  // Funny faces
    "😀", "😂", "😜", "😇", "🤓", "🤩", "🤔", "😬", "😷", "🥺", "😈", "🤡", "💩", "👻", "👽", "🤖", "💀", "👾", "👹", "👺", "🤠",
    // Fruits
    "🍎", "🍌", "🍇", "🍓", "🍒", "🍉", "🍍", "🥭", "🥝", "🍋",
    // Flowers
    "🌸", "💐", "🌼", "🌹", "🌺", "🌻",
    // Sun
    "☀️", "🌞",
    // animal and birds
    "🐻", "🐻‍❄️", "🐰", "🐇", "🐳", "🕊️", "🐥",
    // Star
    "⭐️", "🌟","🔥","⛄",
    // Cloud
    "☁️", "🌥️", "🌦️", "🌧️", "⛈️", "🌩️", "🌨️",
    // Hearts
    "❤️", "💛", "💚", "💙", "💜", "🖤", "💓", "💖","💕",
    // Prizes
    "🎁", "🏆", "🥇", "🥈", "🥉", "🎉", "🎊"
];

export const getEmoji = () => {
	return funEmojis[Math.floor(Math.random() * funEmojis.length)];
};