module.exports = grammar({
  name: 'autohotkey',

  extras: $ => [
    /\s/,
  ],

  // Removed word: $ => $.identifier (keyword extraction)

  conflicts: $ => [
    [$.parameter, $._expression],
    [$.command],
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.comment,
      $.doc_comment,
      $.block_comment,
      $.directive,
      $.hotkey,
      $.label,
      $.function_definition,
      $.function_call,
      $.command,
      $.string,
      $.number,
      $.keyword,
      $.operator,
      $.builtin_variable,
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

    // Label: identifier followed by single colon at end of meaningful content
    label: $ => seq(
      field('name', $.identifier),
      token.immediate(':')
    ),

    function_definition: $ => seq(
      field('name', $.identifier),
      token.immediate('('),
      optional($.parameter_list),
      ')',
      '{',
      repeat($._statement),
      '}'
    ),

    function_call: $ => seq(
      field('name', $.identifier),
      token.immediate('('),
      optional($.argument_list),
      ')'
    ),

    command: $ => prec(2, seq(
      field('name', $.command_name),
      optional(seq(
        ',',
        optional($.command_arguments)
      ))
    )),

    // Split into multiple token() groups to avoid regex length limit in tree-sitter-wasm
    command_name: $ => choice(
      token(prec(3, /MsgBox|InputBox|ToolTip|TrayTip/)),
      token(prec(3, /Send|SendInput|SendRaw|SendEvent|SendPlay/)),
      token(prec(3, /Sleep|SetTimer|Pause|Suspend/)),
      token(prec(3, /Run|RunWait|Reload|ExitApp/)),
      token(prec(3, /WinActivate|WinWait|WinClose|WinMinimize|WinMaximize/)),
      token(prec(3, /FileRead|FileAppend|FileDelete|FileCopy|FileMove/)),
      token(prec(3, /RegRead|RegWrite|RegDelete/)),
      token(prec(3, /IniRead|IniWrite/)),
      token(prec(3, /Gui|GuiControl/)),
      token(prec(3, /SetWorkingDir|CoordMode|SetFormat|SetBatchLines/)),
      token(prec(3, /SetDefaultMouseSpeed|SetWinDelay|SetControlDelay/)),
      token(prec(3, /Gosub|Goto/)),
    ),

    command_arguments: $ => prec.left(repeat1(choice(
      $.variable_ref,
      $.string,
      $.number,
      ',',
      /[^\s,\n%"']+/,
    ))),

    variable_ref: $ => seq('%', choice($.builtin_variable, $.identifier), '%'),

    parameter_list: $ => seq(
      $.parameter,
      repeat(seq(',', $.parameter))
    ),

    parameter: $ => seq(
      $.identifier,
      optional(seq(':=', $._expression))
    ),

    argument_list: $ => seq(
      $._expression,
      repeat(seq(',', $._expression))
    ),

    _expression: $ => choice(
      $.string,
      $.number,
      $.builtin_variable,
      $.identifier,
      $.function_call,
    ),

    string: $ => choice(
      seq('"', /[^"]*/, '"'),
      seq("'", /[^']*/, "'"),
    ),

    number: $ => choice(
      /0[xX][0-9a-fA-F]+/,
      /\d+\.\d+/,
      /\d+/,
    ),

    keyword: $ => choice(
      'if', 'else', 'while', 'loop', 'for',
      'return', 'break', 'continue', 'goto', 'gosub',
      'class', 'extends',
      'global', 'local', 'static',
      'try', 'catch', 'finally', 'throw',
      'new', 'true', 'false',
      'and', 'or', 'not',
    ),

    operator: $ => choice(
      // Assignment
      ':=', '+=', '-=', '*=', '/=', '.=',
      // Comparison
      '==', '!=', '<>', '>=', '<=', '>', '<',
      // Arithmetic
      '//', '**', '+', '-', '*', '/', '%',
      // Logical
      '&&', '||', '!',
      // Bitwise
      '>>', '<<', '&', '|', '^', '~',
      // Ternary (only ?, colon conflicts with labels)
      '?',
    ),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    builtin_variable: $ => token(choice(
      // Non-A_ builtins
      'Clipboard', 'ClipboardAll', 'ErrorLevel',

      // Script info
      'A_ScriptDir', 'A_ScriptFullPath', 'A_ScriptName', 'A_ScriptHwnd',
      'A_LineNumber', 'A_LineFile', 'A_AhkVersion', 'A_AhkPath',
      'A_IsCompiled', 'A_IsUnicode', 'A_PtrSize',

      // Date/Time
      'A_Now', 'A_NowUTC', 'A_TickCount',
      'A_Year', 'A_Mon', 'A_DD', 'A_MDay', 'A_WDay', 'A_YDay', 'A_YWeek',
      'A_Hour', 'A_Min', 'A_Sec', 'A_MSec',

      // Paths
      'A_WorkingDir', 'A_Desktop', 'A_DesktopCommon', 'A_MyDocuments',
      'A_AppData', 'A_AppDataCommon', 'A_Temp',
      'A_StartMenu', 'A_Programs', 'A_Startup',
      'A_WinDir', 'A_ProgramFiles', 'A_ComSpec',

      // Screen/Display
      'A_ScreenWidth', 'A_ScreenHeight', 'A_ScreenDPI',

      // Keyboard/Mouse
      'A_Cursor', 'A_CaretX', 'A_CaretY', 'A_TimeIdle', 'A_TimeIdlePhysical',

      // Hotkey
      'A_ThisHotkey', 'A_PriorHotkey', 'A_TimeSinceThisHotkey', 'A_TimeSincePriorHotkey', 'A_EndChar',

      // Loop
      'A_Index', 'A_LoopField',
      'A_LoopFileName', 'A_LoopFileFullPath', 'A_LoopFilePath', 'A_LoopFileDir', 'A_LoopFileExt',
      'A_LoopFileTimeCreated', 'A_LoopFileTimeModified', 'A_LoopFileTimeAccessed', 'A_LoopFileSize',
      'A_LoopRegName', 'A_LoopRegKey', 'A_LoopReadLine',

      // GUI
      'A_Gui', 'A_GuiControl', 'A_GuiEvent', 'A_GuiWidth', 'A_GuiHeight', 'A_GuiX', 'A_GuiY', 'A_EventInfo',

      // Other
      'A_Space', 'A_Tab',
      'A_UserName', 'A_ComputerName',
      'A_IPAddress1', 'A_IPAddress2', 'A_IPAddress3', 'A_IPAddress4',
      'A_IsAdmin', 'A_OSType', 'A_OSVersion', 'A_Language',
      'A_IsSuspended', 'A_IsPaused', 'A_IsCritical',
      'A_BatchLines', 'A_TitleMatchMode', 'A_DetectHiddenWindows', 'A_DetectHiddenText',
      'A_LastError',
    )),

    // Remaining punctuation (braces, brackets, parens, dots, commas)
    _punctuation: $ => /[(){}\[\].,@$\\]+/,
  }
});
