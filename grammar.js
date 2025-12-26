module.exports = grammar({
  name: 'autohotkey',

  word: $ => $.identifier,

  extras: $ => [
    /\s/,
  ],

  conflicts: $ => [
    [$.parameter, $._expression],
    [$.variable_ref, $.operator],
    [$.variable_ref, $._expression],   // %var% in expressions
    [$.loop_statement, $._statement],  // loop identifier: count vs braceless body
    [$.catch_clause, $._statement],    // catch identifier: exception vs braceless body
    [$.else_clause, $._statement],     // else if_statement: else body vs separate statement
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.comment,
      $.doc_comment,
      $.block_comment,
      $.directive,
      $.hotkey,
      $.hotstring_definition,
      $._colon_pair,  // Before label - matches "MyGui:Add" to prevent false label matches
      $.label,
      $.class_definition,
      $.function_definition,
      // Control flow statements (before keyword!)
      $.if_statement,
      $.while_statement,
      $.loop_statement,
      $.for_statement,
      $.try_statement,
      $.switch_statement,
      // Expressions that can appear at statement level
      $.assignment_expression,
      $.method_call,
      $.member_expression,
      $.index_expression,
      $.function_call,
      $.command,
      $.array_literal,
      $.string,
      $.number,
      $.boolean,
      // NOTE: parenthesized_expression removed from _statement to reduce state count
      // It's still in _expression for conditions
      $.keyword,
      $.operator,
      prec(3, $.builtin_variable),
      prec(4, $.variable_ref),  // Higher precedence than builtin_variable for injection parsing
      $.identifier,
      $._punctuation,
    ),

    comment: $ => seq(
      ';',
      /.*/
    ),

    block_comment: $ => seq(
      '/*',
      /[^*]*\*+([^/*][^*]*\*+)*/,
      '/'
    ),

    doc_comment: $ => seq(
      '/**',
      /[^*]*\*+([^/*][^*]*\*+)*/,
      '/'
    ),

    directive: $ => seq(
      '#',
      $.identifier,
      optional(/[^\n]*/)
    ),

    // Hotkey: modifiers + key + ::
    hotkey: $ => token(seq(
      optional(/[#!^+<>*~$]+/),
      /[a-zA-Z0-9]+/,
      '::'
    )),

    // Hotstring: :options:trigger::replacement
    hotstring_definition: $ => seq(
      ':',
      optional(field('options', $.hotstring_options)),
      ':',
      field('trigger', $.hotstring_trigger),
      '::',
      optional(field('replacement', $.hotstring_replacement))
    ),

    hotstring_options: $ => token(/[*?CORZTXB0-9SIEPK]+/i),
    hotstring_trigger: $ => token(/[^:\r\n]+/),
    hotstring_replacement: $ => token.immediate(/[^\r\n]+/),

    // Label: identifier followed by single colon
    label: $ => seq(
      field('name', $.identifier),
      token.immediate(':')
    ),

    // Colon pair (like MyGui:Add or MyGui:-Caption) - higher precedence than label
    // to prevent "MyGui:Add" from being parsed as label + identifier during injection
    // Matches identifier: followed by non-whitespace, non-colon (excludes :: hotkey syntax)
    _colon_pair: $ => token(prec(10, /[a-zA-Z_#@$][a-zA-Z0-9_#@$]*:[^:\s]+/)),

    block: $ => repeat1($._statement),

    // Parenthesized expression for conditions
    parenthesized_expression: $ => seq('(', $._expression, ')'),

    // Statement block (braces + optional statements) for control flow
    statement_block: $ => seq('{', optional($.block), '}'),

    // Control flow statements - support both braced blocks and single statements
    if_statement: $ => prec.right(seq(
      'if',
      field('condition', seq(
        $.parenthesized_expression,
        repeat(seq(choice('&&', '||', 'and', 'or'), $.parenthesized_expression))
      )),
      field('consequence', choice($.statement_block, $._statement)),
      optional(field('alternative', $.else_clause))
    )),

    else_clause: $ => seq(
      'else',
      choice($.if_statement, $.statement_block, $._statement)
    ),

    while_statement: $ => seq(
      'while',
      field('condition', $.parenthesized_expression),
      field('body', choice($.statement_block, $._statement))
    ),

    loop_statement: $ => prec.right(seq(
      'loop',
      optional(choice(
        // Comma-style variant: loop, parse, ...
        seq(
          ',',
          field('type', $.loop_type),
          optional(field('arguments', $.loop_arguments))
        ),
        // Count-based: loop 10 or loop count
        field('count', choice($.number, $.identifier))
      )),
      field('body', choice($.statement_block, $._statement))
    )),

    loop_type: $ => choice('parse', 'files', 'read', 'reg'),

    loop_arguments: $ => /[^\r\n{]+/,

    for_statement: $ => seq(
      'for',
      field('key', $.identifier),
      optional(seq(',', field('value', $.identifier))),
      'in',
      field('collection', $._expression),
      field('body', choice($.statement_block, $._statement))
    ),

    try_statement: $ => prec.right(seq(
      'try',
      field('body', choice($.statement_block, $._statement)),
      optional($.catch_clause),
      optional($.finally_clause)
    )),

    catch_clause: $ => seq(
      'catch',
      optional(field('exception', $.identifier)),
      field('body', choice($.statement_block, $._statement))
    ),

    finally_clause: $ => seq(
      'finally',
      field('body', choice($.statement_block, $._statement))
    ),

    switch_statement: $ => seq(
      'switch',
      field('value', $._expression),
      '{',
      repeat($.case_clause),
      optional($.default_clause),
      '}'
    ),

    case_clause: $ => seq(
      'case',
      field('values', seq($._expression, repeat(seq(',', $._expression)))),
      ':',
      optional($.block)
    ),

    default_clause: $ => seq(
      'default',
      ':',
      optional($.block)
    ),

    function_definition: $ => prec.dynamic(10, seq(
      field('name', $.identifier),
      token.immediate('('),
      optional($.parameter_list),
      ')',
      '{',
      optional(field('body', $.block)),
      '}'
    )),

    class_definition: $ => prec.dynamic(10, seq(
      'class',
      field('name', $.identifier),
      optional(seq('extends', field('parent', $.identifier))),
      field('body', $.class_body)
    )),

    class_body: $ => seq(
      '{',
      repeat($.class_member),
      '}'
    ),

    class_member: $ => choice(
      $.comment,
      $.doc_comment,
      $.block_comment,
      $.class_definition,
      $.method_definition,
      $.class_property,
    ),

    method_definition: $ => prec.dynamic(10, seq(
      optional('static'),
      field('name', $.identifier),
      token.immediate('('),
      optional($.parameter_list),
      ')',
      '{',
      optional(field('body', $.block)),
      '}'
    )),

    class_property: $ => seq(
      optional('static'),
      field('name', $.identifier),
      optional(seq(':=', field('value', $._expression)))
    ),

    function_call: $ => prec(2, seq(
      field('name', $.identifier),
      token.immediate('('),
      optional($.argument_list),
      ')'
    )),

    member_expression: $ => prec.left(1, seq(
      field('object', choice($.identifier, $.member_expression, $.this_expression, $.base_expression)),
      token.immediate('.'),
      field('property', $.identifier)
    )),

    method_call: $ => prec(3, prec.left(2, seq(
      field('object', choice($.identifier, $.member_expression, $.this_expression, $.base_expression)),
      token.immediate('.'),
      field('method', $.identifier),
      token.immediate('('),
      optional($.argument_list),
      ')'
    ))),

    // Commands use comma syntax: MsgBox, args
    // Function calls use parens: MsgBox("args")
    // The comma after the name distinguishes command from function call
    command: $ => prec(2, seq(
      field('name', alias($._command_name_pattern, $.command_name)),
      ',',
      optional($.command_arguments)
    )),

    // Internal pattern for command names - only used within command rule
    _command_name_pattern: $ => token(
      /MsgBox|InputBox|ToolTip|TrayTip|Send|SendInput|SendRaw|SendEvent|SendPlay|Sleep|SetTimer|Pause|Suspend|Run|RunWait|Reload|ExitApp|WinActivate|WinWait|WinClose|WinMinimize|WinMaximize|FileRead|FileAppend|FileDelete|FileCopy|FileMove|RegRead|RegWrite|RegDelete|IniRead|IniWrite|Gui|GuiControl|SetWorkingDir|CoordMode|SetFormat|SetBatchLines|SetDefaultMouseSpeed|SetWinDelay|SetControlDelay|Gosub|Goto/
    ),

    // Single-line token to prevent commands from spanning lines
    // prec(15) ensures this wins over _colon_pair (prec 10) for patterns like "Gui, MyGui:Add"
    // Variable refs (%var%) are highlighted via injection in injections.scm
    command_arguments: $ => token(prec(15, /[^\r\n]+/)),

    variable_ref: $ => seq('%', choice(prec(3, $.builtin_variable), $.identifier), '%'),

    parameter_list: $ => seq(
      $.parameter,
      repeat(seq(',', $.parameter))
    ),

    parameter: $ => seq(
      $.identifier,
      optional(prec(5, seq(':=', $._expression)))
    ),

    argument_list: $ => seq(
      $._expression,
      repeat(seq(',', $._expression))
    ),

    _expression: $ => choice(
      $.ternary_expression,
      $.binary_expression,
      $.unary_expression,
      $.assignment_expression,
      $.this_expression,
      $.base_expression,
      $.string,
      $.number,
      $.boolean,
      prec(3, $.builtin_variable),
      $.variable_ref,  // %var% syntax - must be reachable for highlights.scm
      $.array_literal,
      $.object_literal,
      $.index_expression,
      $.member_expression,
      $.method_call,
      $.identifier,
      $.function_call,
      $.parenthesized_expression,
    ),

    // Ternary expression: condition ? consequence : alternative
    ternary_expression: $ => prec.right(1, seq(
      field('condition', $._expression),
      '?',
      field('consequence', $._expression),
      ':',
      field('alternative', $._expression)
    )),

    // Binary expressions with operator precedence
    binary_expression: $ => choice(
      // Logical OR (precedence 2)
      prec.left(2, seq(field('left', $._expression), choice('||', 'or'), field('right', $._expression))),
      // Logical AND (precedence 3)
      prec.left(3, seq(field('left', $._expression), choice('&&', 'and'), field('right', $._expression))),
      // Bitwise OR (precedence 4)
      prec.left(4, seq(field('left', $._expression), '|', field('right', $._expression))),
      // Bitwise XOR (precedence 5)
      prec.left(5, seq(field('left', $._expression), '^', field('right', $._expression))),
      // Bitwise AND (precedence 6)
      prec.left(6, seq(field('left', $._expression), '&', field('right', $._expression))),
      // Equality (precedence 7)
      prec.left(7, seq(field('left', $._expression), choice('=', '==', '!=', '<>'), field('right', $._expression))),
      // Comparison (precedence 8)
      prec.left(8, seq(field('left', $._expression), choice('<', '>', '<=', '>='), field('right', $._expression))),
      // Bitwise shift (precedence 9)
      prec.left(9, seq(field('left', $._expression), choice('<<', '>>'), field('right', $._expression))),
      // Addition/Subtraction (precedence 10)
      prec.left(10, seq(field('left', $._expression), choice('+', '-'), field('right', $._expression))),
      // Multiplication/Division (precedence 11)
      prec.left(11, seq(field('left', $._expression), choice('*', '/', '//', '%'), field('right', $._expression))),
      // Concatenation (precedence 10)
      prec.left(10, seq(field('left', $._expression), '.', field('right', $._expression))),
      // Power (precedence 12, RIGHT associative)
      prec.right(12, seq(field('left', $._expression), '**', field('right', $._expression))),
    ),

    // Unary expressions
    unary_expression: $ => prec(13, choice(
      seq('!', $._expression),
      seq('not', $._expression),
      seq('~', $._expression),
      seq('-', $._expression),
    )),

    // Assignment expression - prec(1) ensures higher precedence than identifier's prec(-1)
    // continuation_section first in choice to match multiline parens before parenthesized_expression
    assignment_expression: $ => prec.right(1, seq(
      field('left', choice($.identifier, $.member_expression, $.index_expression)),
      field('operator', choice(':=', '+=', '-=', '*=', '/=', '.=')),
      field('right', choice($.continuation_section, $._expression))
    )),

    this_expression: $ => 'this',
    base_expression: $ => 'base',

    boolean: $ => choice('true', 'false'),

    array_literal: $ => prec(2, seq(
      '[',
      optional(seq(
        $._expression,
        repeat(seq(',', $._expression))
      )),
      ']'
    )),

    object_literal: $ => prec(2, seq(
      '{',
      optional(seq(
        $.object_property,
        repeat(seq(',', $.object_property))
      )),
      '}'
    )),

    object_property: $ => choice(
      seq(
        field('key', choice($.identifier, $.string, $.number)),
        ':',
        field('value', $._expression)
      ),
      field('key', $.identifier)
    ),

    index_expression: $ => prec.left(1, seq(
      field('object', choice($.identifier, $.member_expression, $.index_expression)),
      token.immediate('['),
      field('index', $._expression),
      ']'
    )),

    string: $ => choice(
      seq('"', repeat(choice($.escape_sequence, /[^"`]+/)), '"'),
      seq("'", repeat(choice($.escape_sequence, /[^'`]+/)), "'"),
    ),

    escape_sequence: $ => token(seq(
      '`',
      choice('n', 't', 'r', '`', '"', "'")
    )),

    number: $ => choice(
      /0[xX][0-9a-fA-F]+/,
      /\d+\.\d+/,
      /\d+/,
    ),

    keyword: $ => choice(
      // Control flow keywords (if, else, while, loop, for) now have dedicated rules
      // Class keywords (class, extends) now have dedicated rules
      // Logical keywords (and, or, not) now handled in binary/unary expressions
      'return', 'break', 'continue', 'goto', 'gosub',
      'global', 'local', 'static',
      'throw',
      'new',
    ),

    operator: $ => choice(
      // Assignment
      ':=', '+=', '-=', '*=', '/=', '.=',
      // Comparison
      '=', '==', '!=', '<>', '>=', '<=', '>', '<',
      // Arithmetic
      '//', '**', '+', '-', '*', '/', '%',
      // Logical
      '&&', '||', '!',
      // Bitwise
      '>>', '<<', '&', '|', '^', '~',
      // Ternary (only ?, colon conflicts with labels)
      '?',
    ),

    // Explicit low precedence so builtin_variable wins
    identifier: $ => token(prec(-1, /[a-zA-Z_][a-zA-Z0-9_]*/)),

    builtin_variable: $ => token(prec(3, choice(
      // Script properties
      /A_ScriptDir|A_ScriptName|A_ScriptFullPath|A_ScriptHwnd|A_WorkingDir|A_InitialWorkingDir|A_Args|A_LineNumber|A_LineFile|A_ThisFunc|A_ThisLabel|A_AhkVersion|A_AhkPath|A_IsUnicode|A_IsCompiled|A_ExitReason/,
      // Date and time
      /A_Now|A_NowUTC|A_YYYY|A_MM|A_DD|A_MMMM|A_MMM|A_DDDD|A_DDD|A_WDay|A_YDay|A_YWeek|A_Hour|A_Min|A_Sec|A_MSec|A_TickCount/,
      // Script settings (part 1)
      /A_IsSuspended|A_IsPaused|A_IsCritical|A_BatchLines|A_ListLines|A_TitleMatchMode|A_TitleMatchModeSpeed|A_DetectHiddenWindows|A_DetectHiddenText|A_AutoTrim|A_StringCaseSense|A_FileEncoding|A_FormatInteger|A_FormatFloat/,
      // Script settings (part 2)
      /A_SendMode|A_SendLevel|A_StoreCapsLockMode|A_KeyDelay|A_KeyDuration|A_KeyDelayPlay|A_KeyDurationPlay|A_WinDelay|A_ControlDelay|A_MouseDelay|A_MouseDelayPlay|A_DefaultMouseSpeed/,
      // Script settings (part 3)
      /A_CoordModeToolTip|A_CoordModePixel|A_CoordModeMouse|A_CoordModeCaret|A_CoordModeMenu|A_RegView|A_IconHidden|A_IconTip|A_IconFile|A_IconNumber/,
      // User idle time
      /A_TimeIdle|A_TimeIdlePhysical|A_TimeIdleKeyboard|A_TimeIdleMouse/,
      // GUI windows
      /A_DefaultGui|A_DefaultListView|A_DefaultTreeView|A_Gui|A_GuiControl|A_GuiWidth|A_GuiHeight|A_GuiX|A_GuiY|A_GuiEvent|A_GuiControlEvent|A_EventInfo/,
      // Hotkeys, hotstrings, menus
      /A_ThisMenuItem|A_ThisMenu|A_ThisMenuItemPos|A_ThisHotkey|A_PriorHotkey|A_PriorKey|A_TimeSinceThisHotkey|A_TimeSincePriorHotkey|A_EndChar/,
      // OS and user info (part 1)
      /A_ComSpec|ComSpec|A_Temp|A_OSType|A_OSVersion|A_Is64bitOS|A_PtrSize|A_Language|A_ComputerName|A_UserName|A_WinDir|A_ProgramFiles/,
      // OS and user info (part 2)
      /A_AppData|A_AppDataCommon|A_Desktop|A_DesktopCommon|A_StartMenu|A_StartMenuCommon|A_Programs|A_ProgramsCommon|A_Startup|A_StartupCommon|A_MyDocuments|A_IsAdmin/,
      // OS and user info (part 3)
      /A_ScreenWidth|A_ScreenHeight|A_ScreenDPI|A_IPAddress1|A_IPAddress2|A_IPAddress3|A_IPAddress4/,
      // Special characters and misc
      /A_Space|A_Tab|A_Cursor|A_CaretX|A_CaretY|A_Clipboard|Clipboard|ClipboardAll|A_LastError|True|False|ErrorLevel/,
      // Loop variables (file loop)
      /A_Index|A_LoopFileName|A_LoopFileExt|A_LoopFileFullPath|A_LoopFileLongPath|A_LoopFileShortPath|A_LoopFileShortName|A_LoopFileDir/,
      // Loop variables (file loop attributes)
      /A_LoopFileTimeModified|A_LoopFileTimeCreated|A_LoopFileTimeAccessed|A_LoopFileAttrib|A_LoopFileSize|A_LoopFileSizeKB|A_LoopFileSizeMB/,
      // Loop variables (registry and parsing)
      /A_LoopRegName|A_LoopRegType|A_LoopRegKey|A_LoopRegSubKey|A_LoopRegTimeModified|A_LoopReadLine|A_LoopField/,
    ))),

    // Remaining punctuation - NOT parens/brackets/braces which have semantic meaning
    _punctuation: $ => /[.,@$\\]+/,

    // Continuation section: multiline content in parens
    // Pattern matches lines that are NOT just "whitespace + )" (the closing line)
    // Line types matched by the repeat:
    //   - Content lines: whitespace + non-whitespace-non-) + rest of line + newline
    //   - Empty lines: just whitespace + newline (or just newline)
    // The closing ) must be on its own line (whitespace + ))
    continuation_section: $ => token(/\((?:[ \t]*[^ \t)\n][^\n]*\n|[ \t]*\n)+[ \t]*\)/),
  }
});
