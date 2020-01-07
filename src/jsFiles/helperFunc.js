function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1
  
    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

var letterToColor = {
    "0": "#EB4E4F",
    "1": "#5DC4E8",
    "2": "#E8725D",
    "3": "#BE73FF",
    "4": "#73FF66",
    "5": "#FFE282",
    "6": "#EB4E4F",
    "7": "#5DC4E8",
    "8": "#E8725D",
    "9": "#BE73FF",

    a: "#5DC4E8",
    b: "#E8725D",
    c: "#BE73FF",
    d: "#73FF66",
    e: "#FFE282",
    f: "#EB4E4F",
    
    g: "#5DC4E8",
    h: "#E8725D",
    i: "#BE73FF",
    j: "#73FF66",
    k: "#FFE282",
    l: "#EB4E4F",

    m: "#5DC4E8",
    n: "#E8725D",
    o: "#BE73FF",
    p: "#73FF66",
    q: "#FFE282",
    r: "#EB4E4F",

    s: "#5DC4E8",
    t: "#E8725D",
    u: "#BE73FF",
    v: "#73FF66",
    w: "#FFE282",
    x: "#EB4E4F",

    y: "#5DC4E8",
    z: "#E8725D",
    "comma": "#E8725D"
}

// go from event (code) --> get the letter --> use the letter get the color
var keyCodeToLetter = {
    48:"0",
    49:"1",
    50:"2",
    51:"3",
    52:"4",
    53:"5",
    54:"6",
    55:"7",
    56:"8",
    57:"9",

    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",

    188: "comma"
}

var keyNumLetter = {
    
    13: "q",
    14: "2",
    15: "w",
    16: "3",
    17: "e",
    18: "r",
    19: "5",
    20: "t",
    21: "6",
    22: "y",
    23: "7",
    24: "u",
    25: "i",
    26: "9",
    27: "o",
    28: "0",
    29: "p",

    30: "z",
    31: "s",
    32: "x",
    33: "d",
    34: "c",
    35: "f",
    36: "v",
    37: "b",
    38: "h",
    39: "n",
    40: "j",
    41: "m",
}

var songs = {
    furElise : ['e','m','j','m','j','m','v','n','b','c','e','y','i','p','c','v',
                'e','y','i','p','c','b','e','e','e','m','j','m','j','m','v','n','b',
                'c','v','b','n','m','i','x',',','m','n','t','u','x','m','n','b', 'u',
                'x','n','b','v', 'e', 'e', 'e', 'm', 'j', 'm','j','m','v','n','b','c'],
    
    noSongSelected : [],
    raindrop : []
}

var letterToPiano = {
    
    2:"piano_c3_sharp",
    3:"piano_d3_sharp",
    
    5:"piano_f3_sharp",
    6:"piano_g3_sharp",
    7:"piano_a3_sharp",
    
    9:"piano_c4_sharp",
    0:"piano_d4_sharp",

    b: "piano_c5",
    c: "piano_a4",
    d: "piano_g4_sharp",
    e: "piano_e3",
    f: "piano_a4_sharp",

    h: "piano_c5_sharp",
    i: "piano_c4",
    j: "piano_d5_sharp",

    l: "piano_f5_sharp",

    m: "piano_e5",
    n: "piano_d5",
    o: "piano_d4",
    p: "piano_e4",
    q: "piano_c3",
    r: "piano_f3",

    s: "piano_f4_sharp",
    t: "piano_g3",
    u: "piano_b3",
    v: "piano_b4",
    w: "piano_d3",
    x: "piano_g4",

    y: "piano_a3",
    z: "piano_f4",

    comma: "piano_f5"

}




export {randomIntFromRange, randomColor, distance, letterToColor, keyCodeToLetter, letterToPiano, songs};