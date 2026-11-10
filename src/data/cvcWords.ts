import { CVCWord, StickerReward } from '../types/phonics';

export const CVC_WORDS: CVCWord[] = [
  // --- Short A Words ---
  {
    id: 'cat',
    word: 'cat',
    onset: 'c',
    vowel: 'a',
    coda: 't',
    phonemes: ['c', 'a', 't'],
    spokenPhonemes: ['k', 'a', 't'],
    wordFamily: '-at',
    label: 'Cat',
    hint: 'A furry pet that says meow!',
    colorTheme: { bg: 'bg-amber-50', border: 'border-amber-300', accent: 'text-amber-700' }
  },
  {
    id: 'bat',
    word: 'bat',
    onset: 'b',
    vowel: 'a',
    coda: 't',
    phonemes: ['b', 'a', 't'],
    spokenPhonemes: ['b', 'a', 't'],
    wordFamily: '-at',
    label: 'Bat',
    hint: 'A flying friend or a baseball bat!',
    colorTheme: { bg: 'bg-indigo-50', border: 'border-indigo-300', accent: 'text-indigo-700' }
  },
  {
    id: 'hat',
    word: 'hat',
    onset: 'h',
    vowel: 'a',
    coda: 't',
    phonemes: ['h', 'a', 't'],
    spokenPhonemes: ['h', 'a', 't'],
    wordFamily: '-at',
    label: 'Hat',
    hint: 'You wear this on your head!',
    colorTheme: { bg: 'bg-rose-50', border: 'border-rose-300', accent: 'text-rose-700' }
  },
  {
    id: 'pan',
    word: 'pan',
    onset: 'p',
    vowel: 'a',
    coda: 'n',
    phonemes: ['p', 'a', 'n'],
    spokenPhonemes: ['p', 'a', 'n'],
    wordFamily: '-an',
    label: 'Pan',
    hint: 'Used in the kitchen to fry yummy pancakes!',
    colorTheme: { bg: 'bg-teal-50', border: 'border-teal-300', accent: 'text-teal-700' }
  },
  {
    id: 'fan',
    word: 'fan',
    onset: 'f',
    vowel: 'a',
    coda: 'n',
    phonemes: ['f', 'a', 'n'],
    spokenPhonemes: ['f', 'a', 'n'],
    wordFamily: '-an',
    label: 'Fan',
    hint: 'Blows cool, gentle air when it is hot!',
    colorTheme: { bg: 'bg-cyan-50', border: 'border-cyan-300', accent: 'text-cyan-700' }
  },
  {
    id: 'van',
    word: 'van',
    onset: 'v',
    vowel: 'a',
    coda: 'n',
    phonemes: ['v', 'a', 'n'],
    spokenPhonemes: ['v', 'a', 'n'],
    wordFamily: '-an',
    label: 'Van',
    hint: 'A big vehicle for family road trips!',
    colorTheme: { bg: 'bg-blue-50', border: 'border-blue-300', accent: 'text-blue-700' }
  },
  {
    id: 'map',
    word: 'map',
    onset: 'm',
    vowel: 'a',
    coda: 'p',
    phonemes: ['m', 'a', 'p'],
    spokenPhonemes: ['m', 'a', 'p'],
    wordFamily: '-ap',
    label: 'Map',
    hint: 'Guides treasure hunters and explorers!',
    colorTheme: { bg: 'bg-emerald-50', border: 'border-emerald-300', accent: 'text-emerald-700' }
  },
  {
    id: 'cap',
    word: 'cap',
    onset: 'c',
    vowel: 'a',
    coda: 'p',
    phonemes: ['c', 'a', 'p'],
    spokenPhonemes: ['k', 'a', 'p'],
    wordFamily: '-ap',
    label: 'Cap',
    hint: 'A sporty baseball hat with a visor!',
    colorTheme: { bg: 'bg-sky-50', border: 'border-sky-300', accent: 'text-sky-700' }
  },

  // --- Short E Words ---
  {
    id: 'hen',
    word: 'hen',
    onset: 'h',
    vowel: 'e',
    coda: 'n',
    phonemes: ['h', 'e', 'n'],
    spokenPhonemes: ['h', 'e', 'n'],
    wordFamily: '-en',
    label: 'Hen',
    hint: 'A mom bird that clucks and lays eggs!',
    colorTheme: { bg: 'bg-amber-50', border: 'border-amber-300', accent: 'text-amber-700' }
  },
  {
    id: 'pen',
    word: 'pen',
    onset: 'p',
    vowel: 'e',
    coda: 'n',
    phonemes: ['p', 'e', 'n'],
    spokenPhonemes: ['p', 'e', 'n'],
    wordFamily: '-en',
    label: 'Pen',
    hint: 'Writes colorful words with smooth ink!',
    colorTheme: { bg: 'bg-violet-50', border: 'border-violet-300', accent: 'text-violet-700' }
  },
  {
    id: 'bed',
    word: 'bed',
    onset: 'b',
    vowel: 'e',
    coda: 'd',
    phonemes: ['b', 'e', 'd'],
    spokenPhonemes: ['b', 'e', 'd'],
    wordFamily: '-ed',
    label: 'Bed',
    hint: 'Cozy and soft for sleepy bedtime dreams!',
    colorTheme: { bg: 'bg-blue-50', border: 'border-blue-300', accent: 'text-blue-700' }
  },
  {
    id: 'net',
    word: 'net',
    onset: 'n',
    vowel: 'e',
    coda: 't',
    phonemes: ['n', 'e', 't'],
    spokenPhonemes: ['n', 'e', 't'],
    wordFamily: '-et',
    label: 'Net',
    hint: 'Catches butterflies or soccer balls!',
    colorTheme: { bg: 'bg-lime-50', border: 'border-lime-300', accent: 'text-lime-700' }
  },
  {
    id: 'jet',
    word: 'jet',
    onset: 'j',
    vowel: 'e',
    coda: 't',
    phonemes: ['j', 'e', 't'],
    spokenPhonemes: ['j', 'e', 't'],
    wordFamily: '-et',
    label: 'Jet',
    hint: 'Zooms super fast across the blue sky!',
    colorTheme: { bg: 'bg-sky-50', border: 'border-sky-300', accent: 'text-sky-700' }
  },

  // --- Short I Words ---
  {
    id: 'pig',
    word: 'pig',
    onset: 'p',
    vowel: 'i',
    coda: 'g',
    phonemes: ['p', 'i', 'g'],
    spokenPhonemes: ['p', 'i', 'g'],
    wordFamily: '-ig',
    label: 'Pig',
    hint: 'A cute pink farm buddy who says oink!',
    colorTheme: { bg: 'bg-pink-50', border: 'border-pink-300', accent: 'text-pink-700' }
  },
  {
    id: 'wig',
    word: 'wig',
    onset: 'w',
    vowel: 'i',
    coda: 'g',
    phonemes: ['w', 'i', 'g'],
    spokenPhonemes: ['w', 'i', 'g'],
    wordFamily: '-ig',
    label: 'Wig',
    hint: 'Fun fake hair for dress-up parties!',
    colorTheme: { bg: 'bg-purple-50', border: 'border-purple-300', accent: 'text-purple-700' }
  },
  {
    id: 'pin',
    word: 'pin',
    onset: 'p',
    vowel: 'i',
    coda: 'n',
    phonemes: ['p', 'i', 'n'],
    spokenPhonemes: ['p', 'i', 'n'],
    wordFamily: '-in',
    label: 'Pin',
    hint: 'Holds papers together on a corkboard!',
    colorTheme: { bg: 'bg-emerald-50', border: 'border-emerald-300', accent: 'text-emerald-700' }
  },
  {
    id: 'bin',
    word: 'bin',
    onset: 'b',
    vowel: 'i',
    coda: 'n',
    phonemes: ['b', 'i', 'n'],
    spokenPhonemes: ['b', 'i', 'n'],
    wordFamily: '-in',
    label: 'Bin',
    hint: 'Where we neatly put toys or recyclables!',
    colorTheme: { bg: 'bg-teal-50', border: 'border-teal-300', accent: 'text-teal-700' }
  },
  {
    id: 'lip',
    word: 'lip',
    onset: 'l',
    vowel: 'i',
    coda: 'p',
    phonemes: ['l', 'i', 'p'],
    spokenPhonemes: ['l', 'i', 'p'],
    wordFamily: '-ip',
    label: 'Lip',
    hint: 'Smile wide with your teeth and lips!',
    colorTheme: { bg: 'bg-rose-50', border: 'border-rose-300', accent: 'text-rose-700' }
  },
  {
    id: 'zip',
    word: 'zip',
    onset: 'z',
    vowel: 'i',
    coda: 'p',
    phonemes: ['z', 'i', 'p'],
    spokenPhonemes: ['z', 'i', 'p'],
    wordFamily: '-ip',
    label: 'Zip',
    hint: 'Zips up your warm winter jacket!',
    colorTheme: { bg: 'bg-amber-50', border: 'border-amber-300', accent: 'text-amber-700' }
  },

  // --- Short O Words ---
  {
    id: 'dog',
    word: 'dog',
    onset: 'd',
    vowel: 'o',
    coda: 'g',
    phonemes: ['d', 'o', 'g'],
    spokenPhonemes: ['d', 'o', 'g'],
    wordFamily: '-og',
    label: 'Dog',
    hint: 'A playful puppy with a wagging tail!',
    colorTheme: { bg: 'bg-orange-50', border: 'border-orange-300', accent: 'text-orange-700' }
  },
  {
    id: 'log',
    word: 'log',
    onset: 'l',
    vowel: 'o',
    coda: 'g',
    phonemes: ['l', 'o', 'g'],
    spokenPhonemes: ['l', 'o', 'g'],
    wordFamily: '-og',
    label: 'Log',
    hint: 'A wooden tree branch in the peaceful forest!',
    colorTheme: { bg: 'bg-amber-50', border: 'border-amber-300', accent: 'text-amber-700' }
  },
  {
    id: 'fox',
    word: 'fox',
    onset: 'f',
    vowel: 'o',
    coda: 'x',
    phonemes: ['f', 'o', 'x'],
    spokenPhonemes: ['f', 'o', 'x'],
    wordFamily: '-ox',
    label: 'Fox',
    hint: 'A clever woodland creature with orange fur!',
    colorTheme: { bg: 'bg-orange-50', border: 'border-orange-300', accent: 'text-orange-700' }
  },
  {
    id: 'box',
    word: 'box',
    onset: 'b',
    vowel: 'o',
    coda: 'x',
    phonemes: ['b', 'o', 'x'],
    spokenPhonemes: ['b', 'o', 'x'],
    wordFamily: '-ox',
    label: 'Box',
    hint: 'Holds exciting birthday presents and surprises!',
    colorTheme: { bg: 'bg-yellow-50', border: 'border-yellow-300', accent: 'text-yellow-700' }
  },
  {
    id: 'mop',
    word: 'mop',
    onset: 'm',
    vowel: 'o',
    coda: 'p',
    phonemes: ['m', 'o', 'p'],
    spokenPhonemes: ['m', 'o', 'p'],
    wordFamily: '-op',
    label: 'Mop',
    hint: 'Cleans up kitchen spills squeaky clean!',
    colorTheme: { bg: 'bg-blue-50', border: 'border-blue-300', accent: 'text-blue-700' }
  },
  {
    id: 'pot',
    word: 'pot',
    onset: 'p',
    vowel: 'o',
    coda: 't',
    phonemes: ['p', 'o', 't'],
    spokenPhonemes: ['p', 'o', 't'],
    wordFamily: '-ot',
    label: 'Pot',
    hint: 'Cooks warm soup or holds a lovely green plant!',
    colorTheme: { bg: 'bg-stone-50', border: 'border-stone-300', accent: 'text-stone-700' }
  },

  // --- Short U Words ---
  {
    id: 'sun',
    word: 'sun',
    onset: 's',
    vowel: 'u',
    coda: 'n',
    phonemes: ['s', 'u', 'n'],
    spokenPhonemes: ['s', 'u', 'n'],
    wordFamily: '-un',
    label: 'Sun',
    hint: 'Shines bright and warm in the daytime sky!',
    colorTheme: { bg: 'bg-yellow-50', border: 'border-yellow-300', accent: 'text-yellow-700' }
  },
  {
    id: 'bug',
    word: 'bug',
    onset: 'b',
    vowel: 'u',
    coda: 'g',
    phonemes: ['b', 'u', 'g'],
    spokenPhonemes: ['b', 'u', 'g'],
    wordFamily: '-ug',
    label: 'Bug',
    hint: 'A little cute beetle crawling on a leaf!',
    colorTheme: { bg: 'bg-emerald-50', border: 'border-emerald-300', accent: 'text-emerald-700' }
  },
  {
    id: 'mug',
    word: 'mug',
    onset: 'm',
    vowel: 'u',
    coda: 'g',
    phonemes: ['m', 'u', 'g'],
    spokenPhonemes: ['m', 'u', 'g'],
    wordFamily: '-ug',
    label: 'Mug',
    hint: 'Holds warm milk or yummy hot cocoa!',
    colorTheme: { bg: 'bg-indigo-50', border: 'border-indigo-300', accent: 'text-indigo-700' }
  },
  {
    id: 'cup',
    word: 'cup',
    onset: 'c',
    vowel: 'u',
    coda: 'p',
    phonemes: ['c', 'u', 'p'],
    spokenPhonemes: ['k', 'u', 'p'],
    wordFamily: '-up',
    label: 'Cup',
    hint: 'Drink fresh water and juice from this!',
    colorTheme: { bg: 'bg-cyan-50', border: 'border-cyan-300', accent: 'text-cyan-700' }
  },
  {
    id: 'bus',
    word: 'bus',
    onset: 'b',
    vowel: 'u',
    coda: 's',
    phonemes: ['b', 'u', 's'],
    spokenPhonemes: ['b', 'u', 's'],
    wordFamily: '-us',
    label: 'Bus',
    hint: 'The big yellow school bus beep-beeps along!',
    colorTheme: { bg: 'bg-amber-50', border: 'border-amber-300', accent: 'text-amber-700' }
  },
  {
    id: 'tub',
    word: 'tub',
    onset: 't',
    vowel: 'u',
    coda: 'b',
    phonemes: ['t', 'u', 'b'],
    spokenPhonemes: ['t', 'u', 'b'],
    wordFamily: '-ub',
    label: 'Tub',
    hint: 'Splish splash with soapy bubbles at bath time!',
    colorTheme: { bg: 'bg-sky-50', border: 'border-sky-300', accent: 'text-sky-700' }
  },
  {
    id: 'nut',
    word: 'nut',
    onset: 'n',
    vowel: 'u',
    coda: 't',
    phonemes: ['n', 'u', 't'],
    spokenPhonemes: ['n', 'u', 't'],
    wordFamily: '-ut',
    label: 'Nut',
    hint: 'A crunchy snack saved by little squirrels!',
    colorTheme: { bg: 'bg-amber-50', border: 'border-amber-300', accent: 'text-amber-700' }
  }
];

export const VOWEL_INFO = {
  a: {
    letter: 'A',
    soundName: 'Short A',
    phonemeText: '/æ/ like in Apple',
    color: 'bg-rose-500 text-white',
    ringColor: 'ring-rose-400',
    lightBg: 'bg-rose-100 text-rose-800'
  },
  e: {
    letter: 'E',
    soundName: 'Short E',
    phonemeText: '/e/ like in Elephant',
    color: 'bg-emerald-500 text-white',
    ringColor: 'ring-emerald-400',
    lightBg: 'bg-emerald-100 text-emerald-800'
  },
  i: {
    letter: 'I',
    soundName: 'Short I',
    phonemeText: '/ɪ/ like in Igloo',
    color: 'bg-sky-500 text-white',
    ringColor: 'ring-sky-400',
    lightBg: 'bg-sky-100 text-sky-800'
  },
  o: {
    letter: 'O',
    soundName: 'Short O',
    phonemeText: '/ɒ/ like in Octopus',
    color: 'bg-amber-500 text-white',
    ringColor: 'ring-amber-400',
    lightBg: 'bg-amber-100 text-amber-800'
  },
  u: {
    letter: 'U',
    soundName: 'Short U',
    phonemeText: '/ʌ/ like in Umbrella',
    color: 'bg-purple-500 text-white',
    ringColor: 'ring-purple-400',
    lightBg: 'bg-purple-100 text-purple-800'
  }
};

export const WORD_FAMILIES = [
  { id: '-at', label: '-at Family', vowel: 'a', words: ['cat', 'bat', 'hat'] },
  { id: '-an', label: '-an Family', vowel: 'a', words: ['pan', 'fan', 'van'] },
  { id: '-ap', label: '-ap Family', vowel: 'a', words: ['map', 'cap'] },
  { id: '-en', label: '-en Family', vowel: 'e', words: ['hen', 'pen'] },
  { id: '-et', label: '-et Family', vowel: 'e', words: ['net', 'jet'] },
  { id: '-ig', label: '-ig Family', vowel: 'i', words: ['pig', 'wig'] },
  { id: '-in', label: '-in Family', vowel: 'i', words: ['pin', 'bin'] },
  { id: '-ip', label: '-ip Family', vowel: 'i', words: ['lip', 'zip'] },
  { id: '-og', label: '-og Family', vowel: 'o', words: ['dog', 'log'] },
  { id: '-ox', label: '-ox Family', vowel: 'o', words: ['fox', 'box'] },
  { id: '-ug', label: '-ug Family', vowel: 'u', words: ['bug', 'mug'] },
  { id: '-un', label: '-un Family', vowel: 'u', words: ['sun'] },
  { id: '-up', label: '-up Family', vowel: 'u', words: ['cup'] }
];

export const STICKER_REWARDS: StickerReward[] = [
  { id: 'star_explorer', title: 'Star Reader', emoji: '⭐', description: 'Solved your first CVC word!', unlockedAtWordCount: 1 },
  { id: 'happy_puppy', title: 'Puppy Pal', emoji: '🐶', description: 'Found 3 words with puppy power!', unlockedAtWordCount: 3 },
  { id: 'sunny_smile', title: 'Sunshine Whiz', emoji: '☀️', description: 'Shined bright solving 5 words!', unlockedAtWordCount: 5 },
  { id: 'rainbow_builder', title: 'Rainbow Blender', emoji: '🌈', description: 'Blended 8 words like magic!', unlockedAtWordCount: 8 },
  { id: 'rocket_sound', title: 'Phonics Astronaut', emoji: '🚀', description: 'Blasted off with 12 words!', unlockedAtWordCount: 12 },
  { id: 'reading_crown', title: 'CVC Champion', emoji: '👑', description: 'Mastered 16 words like royalty!', unlockedAtWordCount: 16 },
  { id: 'magic_wand', title: 'Word Wizard', emoji: '🪄', description: 'Incredible! You solved 20 CVC words!', unlockedAtWordCount: 20 }
];

// Alphabet phonics sounds guide for soundboard
export const ALPHABET_PHONICS = [
  { letter: 'a', sound: 'ah', example: 'apple', isVowel: true },
  { letter: 'b', sound: 'buh', example: 'bat', isVowel: false },
  { letter: 'c', sound: 'kuh', example: 'cat', isVowel: false },
  { letter: 'd', sound: 'duh', example: 'dog', isVowel: false },
  { letter: 'e', sound: 'eh', example: 'egg', isVowel: true },
  { letter: 'f', sound: 'fhh', example: 'fan', isVowel: false },
  { letter: 'g', sound: 'guh', example: 'gum', isVowel: false },
  { letter: 'h', sound: 'huh', example: 'hat', isVowel: false },
  { letter: 'i', sound: 'ih', example: 'igloo', isVowel: true },
  { letter: 'j', sound: 'juh', example: 'jet', isVowel: false },
  { letter: 'k', sound: 'kuh', example: 'kite', isVowel: false },
  { letter: 'l', sound: 'lll', example: 'log', isVowel: false },
  { letter: 'm', sound: 'mmm', example: 'map', isVowel: false },
  { letter: 'n', sound: 'nnn', example: 'net', isVowel: false },
  { letter: 'o', sound: 'aw', example: 'ox', isVowel: true },
  { letter: 'p', sound: 'puh', example: 'pig', isVowel: false },
  { letter: 'q', sound: 'kwuh', example: 'queen', isVowel: false },
  { letter: 'r', sound: 'rrr', example: 'rug', isVowel: false },
  { letter: 's', sound: 'sss', example: 'sun', isVowel: false },
  { letter: 't', sound: 'tuh', example: 'tub', isVowel: false },
  { letter: 'u', sound: 'uh', example: 'umbrella', isVowel: true },
  { letter: 'v', sound: 'vvv', example: 'van', isVowel: false },
  { letter: 'w', sound: 'wuh', example: 'wig', isVowel: false },
  { letter: 'x', sound: 'ks', example: 'fox', isVowel: false },
  { letter: 'y', sound: 'yuh', example: 'yarn', isVowel: false },
  { letter: 'z', sound: 'zzz', example: 'zip', isVowel: false }
];
