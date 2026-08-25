-- #popclip
-- name:
--   en: ChatGPT generate PopClip Snippets
--   zh-hans: ChatGPT 生成 PopClip 片段
--   zh-hant: ChatGPT 產生 PopClip 片段
--   ja: ChatGPT で PopClip スニペットを生成
--   ko: ChatGPT로 PopClip 스니펫 생성
--   fr: Générer des snippets PopClip avec ChatGPT
--   es: Generar snippets de PopClip con ChatGPT
-- icon: square filled CPC
-- requirements: [text]
-- language: applescript
set promptText to "You are a PopClip extension author. Generate one installable PopClip snippet from the user request below." & ¬
  "\n\nOutput rules:" & ¬
  "\n- Output exactly one Markdown code block with the language tag yaml: start with ```yaml and end with ```; include no text outside the code block." & ¬
  "\n- The first line inside the code block must be exactly #popclip." & ¬
  "\n- Keep the YAML inside the code block directly selectable and installable as a PopClip snippet after removing only the Markdown fences." & ¬
  "\n- Use valid YAML 1.2 and 2 spaces for indentation; never use tabs." & ¬
  "\n- Use PopClip's exact field names, including fields such as popclip version, javascript, javascript file, shell script, actions, and after. Do not invent snake_case field names." & ¬
  "\n- Choose the simplest suitable action type. Prefer JavaScript for text transformations. Use paste requirements only when the action pastes." & ¬
  "\n- For multi-line scripts, use a YAML literal block (|) with correctly indented content." & ¬
  "\n- Include name and icon when useful. Add requirements, options, regex, or actions only when needed." & ¬
  "\n- Preserve the language and intent of the user request. Keep code and user-facing labels clear and safe." & ¬
  "\n\nThe selected user request is:" & ¬
  "\n" & "{popclip full text}"

set previousClipboard to the clipboard
set the clipboard to promptText

tell application "ChatGPT"
  activate
end tell
delay 0.5

tell application "System Events"
  -- Open the ChatGPT quick conversation dialog without using the global Chat Bar shortcut.
  keystroke "n" using {command down, option down}
  delay 0.5
  keystroke "v" using {command down}
  delay 0.2
  key code 36
end tell

-- Do not leave the generated prompt in the user's clipboard.
delay 0.2
try
  set the clipboard to previousClipboard
end try
