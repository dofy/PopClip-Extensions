-- #popclip
-- name: ChatGPT → PopClip Snippet
-- icon: square filled CPC
-- requirements: [text]
-- language: applescript
tell application id "com.openai.chat"
  activate
end tell
delay 0.3

set promptText to "Please complete the following task as requested:" & ¬
          "\n- Purpose: Generate a PopClip Snippet plugin as requested, directly return the PopClip Snippet installation text, without creating other plugin files, note that you should use the correct yaml format," & ¬
          "\n- Snippet format requirements: first line must be #popclip, can be implemented in multiple languages" & ¬
          "\n- examples:" & ¬
          "\nAn shell script example:" & ¬
          "\n```yaml" & ¬
          "\n#popclip shellscript example" & ¬
          "\nname: Say" & ¬
          "\ninterpreter: zsh" & ¬
          "\nshell script: say -v Daniel $POPCLIP_TEXT" & ¬
          "\n```" & ¬
          "\nAn applescript example:" & ¬
          "\n```yaml" & ¬
          "\n#popclip applescript example" & ¬
          "\nname: Say" & ¬
          "\nlanguage: applescript" & ¬
          "\ntell application \"System Events\"" & ¬
          "\n  do shell script \"say -v Daniel '\" & popclip text" & ¬
          "\n  \"'\"" & ¬
          "\nend tell" & ¬
          "\n```" & ¬
          "\nA JavaScript example, including multiple actions:" & ¬
          "\n```yaml" & ¬
          "\n#popclip js + multi action example" & ¬
          "\nname: Markdown Formatting" & ¬
          "\nrequirements: [text, paste]" & ¬
          "\nactions:" & ¬
          "\n- title: Markdown Bold # note: actions have a `title`, not a `name`" & ¬
          "\n  icon: circle filled B" & ¬
          "\n  javascript: popclip.pasteText('**' + popclip.input.text + '**')" & ¬
          "\n- title: Markdown Italic" & ¬
          "\n  icon: circle filled I" & ¬
          "\n  javascript: popclip.pasteText('*' + popclip.input.text + '*')" & ¬
          "\n```" & ¬
          "\n- Do not include any additional text or comments in the output." & ¬
          "\n- Ensure the output is a valid PopClip Snippet YAML format." & ¬
          "\n- The output should be a complete PopClip Snippet that can be installed directly." & ¬
          "\n- The output should not include any explanations or additional comments." & ¬
          "\n- The output should not include any code blocks or formatting that is not part of the PopClip Snippet YAML format." & ¬
          "\n- Use the correct script name, language, and requirements." & ¬
          "\n  * javascript: `javascript`" & ¬
          "\n  * applescript: `language: applescript`" & ¬
          "\n  * shell script: `interpreter: zsh`" & ¬
          "\n- The first line must be `#popclip`." & ¬
          "\n- The `name` field should be descriptive of the plugin's function." & ¬
          "\n- The `icon` field should be a valid PopClip icon name or a custom icon." & ¬
          "\n  * `T`: Here, `T` specifies the base icon as a text icon." & ¬
          "\n  * `circle T`: This specifies a circle with the letter T." & ¬
          "\n  * `square filled T`: This specifies a filled square with the letter T." & ¬
          "\n  * `symbol:hand.raised`: Here, the base icon as an SF Symbols icon." & ¬
          "\n- The `requirements` field should list any dependencies or required inputs." & ¬
          "\n- The `actions` field should contain a list of actions, each with a `title`, `icon`, and the script to execute." & ¬
          "\n- YAML Format Requirements:" & ¬
          "\n  * Use proper indentation with 2 spaces (not tabs)" & ¬
          "\n  * Include proper quotes around strings with special characters" & ¬
          "\n  * For multiline strings, use the '>' character to indicate folded text" & ¬
          "\n  * Use hyphen lists (-) for array elements with consistent spacing" & ¬
          "\n  * Keep key names lowercase with underscores for readability" & ¬
          "\n- Reference documentation: https://www.popclip.app/dev/snippets" & ¬
          "\n- Task to be completed by the plugin:" & ¬
          "\n" & "{popclip text}"

set the clipboard to promptText
delay 0.3

tell application "System Events"
  keystroke "n" using {command down, shift down}
  delay 0.3
  keystroke "v" using {command down} 
  delay 0.3
  key code 36 -- Enter key
end tell