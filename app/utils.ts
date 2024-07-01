import { customAlphabet } from 'nanoid'
import { Lancelot } from 'next/font/google'

const nanoid = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz', 5)

export function getUniqueID() {
    return nanoid()
}

export const httpError = (reason: string, status: number = 400) => {
    return Response.json({ error: reason }, { status })
}

export const getDateString = (d: number | Date) => {
    if (typeof d === 'number') {
        d = new Date(d)
    }
    return `${d.getUTCFullYear()}/${d.getUTCMonth() + 1}/${d.getUTCDate()} ${d.getUTCHours()}:${d.getUTCMinutes()} (UTC)`
}


// common file extension to language map for prism
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD
const FILE_EXT_TO_LANGUAGE: { [key: string]: string } = {
    'as': 'actionscript',
    aspx: 'aspnet',
    ahk: 'autohotkey',
    sh: 'bash',
    bas: 'basic',
    y: 'bison',
    bf: 'brainfuck',
    c: 'c',
    clj: 'clojure',
    cmake: 'cmake',
    cbl: 'cobol',
    cob: 'cobol',
    coffee: 'coffeescript',
    cpp: 'cpp',
    cs: 'csharp',
    css: 'css',
    csv: 'csv',
    d: 'd',
    dart: 'dart',
    diff: 'diff',
    editorconfig: 'editorconfig',
    ejs: 'ejs',
    ex: 'elixir',
    erb: 'erb',
    erl: 'erlang',
    f: 'fortran',
    f90: 'fortran',
    go: 'go',
    graphql: 'graphql',
    gql: 'graphql',
    haml: 'haml',
    hbs: 'handlebars',
    hs: 'haskell',
    lhs: 'haskell',
    ini: 'ini',
    java: 'java',
    js: 'javascript',
    json: 'json',
    jsx: 'jsx',
    jl: 'julia',
    less: 'less',
    liquid: 'liquid',
    lsp: 'lisp',
    log: 'log',
    lua: 'lua',
    md: 'markdown',
    nix: 'nix',
    m: 'objectivec',
    pas: 'pascal',
    pl: 'perl',
    php: 'php',
    ps1: 'powershell',
    proto: 'protobuf',
    pug: 'pug',
    py: 'python',
    r: 'r',
    rb: 'ruby',
    rs: 'rust',
    sass: 'sass',
    scala: 'scala',
    sc: 'scala',
    scss: 'scss',
    st: 'smalltalk',
    sol: 'solidity',
    sql: 'sql',
    styl: 'stylus',
    swift: 'swift',
    tcl: 'tcl',
    toml: 'toml',
    tsx: 'tsx',
    ts: 'typescript',
    vim: 'vim',
    vlg: 'verilog',
    vh: 'verilog',
    vb: 'visual-basic',
    wasm: 'wasm',
    wiki: 'wiki',
    yaml: 'yaml',
    conf: 'ini',
    html: 'markup',
    xml: 'markup',
    svg: 'markup',
}

const LANGUAGES = new Set(Object.values(FILE_EXT_TO_LANGUAGE))

const EXACT_FILENAME_LANGUAGE: { [key: string]: string } = {
    Dockerfile: 'docker',
    Makefile: 'makefile',
}

export const getLanguageByFilename = (filename: string) => {
    if (EXACT_FILENAME_LANGUAGE.hasOwnProperty(filename)) {
        return EXACT_FILENAME_LANGUAGE[filename]
    }
    const pos = filename.lastIndexOf('.')
    if (pos === -1) {
        if (LANGUAGES.has(filename)) {
            return filename;
        }
    } else {
        return getLanguageByFileExtension(filename.substring(pos + 1))
    }
    return 'text'
}

export const getLanguageByFileExtension = (extension: string) => {
    return FILE_EXT_TO_LANGUAGE.hasOwnProperty(extension) ? FILE_EXT_TO_LANGUAGE[extension] : 'text'
}